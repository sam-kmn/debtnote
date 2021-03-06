<script setup>
import { computed, ref } from '@vue/reactivity'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser)

import { defineProps } from 'vue'
const props = defineProps({ user:String, id:String })
const data = ref()

const private_mode = ref(true)

const fetched_users = ref()
const auth_users = ref([])
const input_users = ref()
const input_name = ref('')

firebase.database().ref('users').once('value')
    .then(res => fetched_users.value = Object.keys(res.val()))

if(props.user && props.id){
    firebase.database().ref(`users/${props.user}/notes/${props.id}`).once('value', snap => {
        if (snap.val()){
            // Save loaded data
            data.value = snap.val()
            // Name
            input_name.value = data.value.name
            // Type
            if (data.value.type === 'public') private_mode.value=false;
            else if (data.value.type === 'private') private_mode.value=true;
            // Members
            if (data.value.members) auth_users.value = Object.values(data.value.members);

        } //else console.error('NoteCreator: failed to load data. No data at given path.', `users/${props.user}/notes/${props.id}`);
    })
} // else console.log('NoteCreator: no props passed')

function grant_permission(){
    if(input_users.value)
        if(fetched_users.value.includes(input_users.value) && input_users.value != user.value.name) 
            auth_users.value.push(input_users.value)
}

function createNote(){
    if(input_name.value){
        var note_data = {name: input_name.value}
        if (private_mode.value){
            note_data['type'] = 'private'
            if (auth_users.value.length > 0) note_data['members'] = auth_users.value
        } else note_data['type'] = 'public'

        firebase.database().ref(`users/${user.value.name}/notes`)
            .push(note_data)
            .then(snap => {
                if (note_data['members']){
                    for (let member of note_data['members']){
                        firebase.database().ref(`users/${member}/shared/${snap.key}`).set(user.value.name)
                    }
                }
                router.push('/dash')
            })
    }
}

function updateNote(){
    if(input_name.value)
        var note_data = {
            name: input_name.value,
            type: private_mode.value ? 'private': 'public',
            members: auth_users.value ?? null 
        }
        firebase.database().ref(`/users/${props.user}/notes/${props.id}`).update(note_data)

        // Update members permisions
        var old_members = data.value.members
        var new_members = auth_users.value
        // console.log('\n-- New Update --\n\n');
        // console.log('%c data', 'background: #222; color: #4a5cd4', data.value )
        // console.log('%c old members', 'background: #222; color: #4a5cd4', old_members)
        // console.log('%c new members', 'background: #222; color: #4a5cd4', new_members )

        // Add shared to member
        // console.log('%c ADD Module! ', 'background: #222; color: #4ad44a');
        if (new_members){
            if (old_members){
                // If old members isnt none, check if users add has been already added
                for (let new_member of new_members){
                    if (!old_members.includes(new_member))
                        shareNote(user.value.name, new_member, props.id)
                        // console.log('add member : ',new_member)

                }
            } else {
                // otherwise, add every one in new_memebers
                for (let new_member of new_members){
                    shareNote(user.value.name, new_member, props.id)
                    // console.log('add member : ',new_member)
                }

            }
        }

        // Delete shared from member
        // console.log('%c DEL Module! ', 'background: #222; color: #d44a71');
        if (old_members){
            if (!new_members){
                // If there is no members, loop old_members and delete shared data
                for (let old_member of old_members){
                    shareNote(user.value.name, old_member, props.id, true)
                    // console.log('delete member : ', old_member)
                }
            } else {
                // otherwise, loop old_members and check if they are not in new_members, delete them
                for (let old_member of old_members){
                    if (!new_members.includes(old_member))
                        shareNote(user.value.name, old_member, props.id, true)
                        // console.log('delete member : ', old_member)
                }
            }
        }
        // router.push({ path: `/note/${props.user}/${props.id}`})
        location.reload()
}

async function shareNote(from, to, id, unshare = false){
    if (!unshare)
        await firebase.database().ref(`users/${to}/shared/${id}`).set(from);
    else
        await firebase.database().ref(`users/${to}/shared/${id}`).remove()
}

function deleteNote(){
    firebase.database().ref(`users/${props.user}/notes/${props.id}`).remove()
        .then(()=> router.push('/dash'))
}

</script>

<template>
    <div class="container">
        <div class="row p-3 justify-content-center">
            <div class="col-12">
                
                <!-- Header slot -->
                <div class="row h2">
                    <slot />
                </div>

                <!-- Note name -->
                <div class="row">
                    <input v-model="input_name" type="text" class="bg-my text-white form-control border-dark" maxlength="13" placeholder="Name (max 13 characters)">
                </div>
                
                <!-- Private mode switch -->
                <div class="row mt-3">
                    <div class="form-check form-switch">
                        <input v-model="private_mode" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked>
                        <label class="form-check-label" for="flexSwitchCheckDefault">Private mode <span v-if="private_mode" class="text-dark">(only authorized users can read/write)</span></label>
                    </div>
                </div>

                <!-- Authoized users -->
                <div v-if="private_mode" class="row mt-3 ">
                    <div class="p-0 h4">Authorized users</div>
                    <div class="input-group p-0">
                        <input v-model="input_users" class="form-control bg-my border-dark text-white" list="datalistOptions" placeholder="Type to search users...">
                        <button @click="grant_permission" class="btn btn-outline-secondary rounded" type="button" >Add</button>
                        <datalist id="datalistOptions">
                            <option v-for="user in fetched_users" :key="user" :value="user" > </option>
                        </datalist>
                    </div>
                    <div class="row mt-2 ">
                        <div v-for="user, id in auth_users" :key="id" class="col-12 mb-2" @click="auth_users.splice(id,1)">
                            <i class="bi bi-x danger"></i>
                            {{user}} 
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div v-if="data" class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content bg-my">
                            <div class="modal-header border-color-grey">
                                <h5 class="modal-title danger" id="exampleModalLabel">Deleting is irreversible!</h5>
                                <button type="button" class="btn white" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                
                                You wont be able to recover lost data. <br>
                                Are you sure you want to delete "{{data.name}}"?
                            </div>
                            <div class="modal-footer border-color-grey">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click="deleteNote" type="button" class="btn btn-danger" data-bs-dismiss="modal">I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="d-flex mt-3 gap-3 justify-content-center">
                    <button v-if="data" class="btn btn-outline-danger rounded-pill" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                    <button class="btn btn-outline-secondary rounded-pill" @click="router.push('/dash')">Cancel</button>
                    <button v-if="data" class="btn btn-outline-primary rounded-pill" @click="updateNote">Save</button>
                    <button v-else class="btn btn-outline-primary rounded-pill" @click="createNote">Save</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.modal-content{
    border-radius: 0.8rem;
}
.border-color-grey{
    border-color: rgb(54, 54, 54);
}
</style>