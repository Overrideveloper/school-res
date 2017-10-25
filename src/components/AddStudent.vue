<template>
    <div>
        <modal name="add_student" :pivotY="0.3" :height="600" >
            <form v-on:submit.prevent="addStudent(); hideModal();">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="hideModal()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title text-center modal-text"><b>Add Student</b></h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="surname" class="control-label col-sm-3 modal-text"> Surname </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="surname" v-model="student.surname" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="fname" class="control-label col-sm-3 modal-text"> First Name </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="fname" v-model="student.firstname" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="midname" class="control-label col-sm-3 modal-text"> Middle Name </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="midname" v-model="student.midname"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="regno" class="control-label col-sm-3 modal-text"> Registration Number </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="regno" v-model="student.regno" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="dept" class="control-label col-sm-3 modal-text"> Department </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="dept" v-model="student.department" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="level" class="control-label col-sm-3 modal-text"> Level </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="level" v-model="student.level" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="dob" class="control-label col-sm-3 modal-text"> Date of Birth </label>
                            <div class="col-sm-6">
                                <date-picker date-format="yy-mm-dd" @update-date="updateDate" :required="true" class="form-control" ></date-picker>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="state" class="control-label col-sm-3 modal-text"> State of Origin </label>
                            <div class="col-sm-6">
                                <input class="form-control" id="state" v-model="student.stateoforigin" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="img" class="control-label col-sm-3 modal-text"> Image </label>
                            <div class="col-sm-6">
                                <input class="form-control" type="file" id="img"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger pull-left" v-on:click="hideModal()">Close</button>
                    <input type="submit" class="btn btn-success" value="Add"/>
                </div>
            </form>
        </modal>
        <vue-toastr ref="toastr"></vue-toastr> 
    </div>
</template>

<script>
import bus from '../bus/bus';

const URL = 'https://schoolinfoapp.herokuapp.com';
export default {
  name: 'AddStudent',
  data() {
    return {
      student: {
        surname: '',
        firstname: '',
        midname: '',
        regno: '',
        stateoforigin: '',
        dob: '',
        department: '',
        level: '',
      },
    };
  },
  methods: {
    showModal() {
      this.$modal.show('add_student');
    },
    hideModal() {
      this.student = [];
      this.$modal.hide('add_student');
    },
    addStudent() {
      this.$http
      // eslint-disable-next-line
        .post(URL + '/api/students', this.student, {
          emulateJSON: true,
        })
        .then((response) => {
          // eslint-disable-next-line
          if (response.status === 201) {
            this.student = [];
            bus.$emit('load_students');
            this.$refs.toastr.s('Student added!', 'SIMS');
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.s('Error adding!', 'SIMS');
        });
    },
    updateDate(date) {
      this.student.dob = date;
    },
  },
  created() {
  // eslint-disable-next-line
    bus.$on('add_student', () => {
      this.showModal();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-text{
    color: blueviolet;
  }
</style>
