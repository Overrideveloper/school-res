<template>
    <div>
        <modal name="add_student" :adaptive="true" :scrollable="true" :pivotY="0.08" height="auto">
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
                                <select v-model="student.department" class="form-control" required>
                                    <option v-for="department in departments" v-bind:value="department.value">{{department.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="level" class="control-label col-sm-3 modal-text"> Level </label>
                            <div class="col-sm-6">
                                <select v-model="student.level" class="form-control" required>
                                    <option v-for="level in levels" v-bind:value="level.value">{{level.name}}</option>
                                </select>
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
                                <select v-model="student.stateoforigin" class="form-control" required>
                                    <option v-for="state in states" v-bind:value="state.name">{{state.name}}</option>
                                </select>
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
      levels: [
        { name: '100 Level', value: '100' },
        { name: '200 Level', value: '200' },
        { name: '300 Level', value: '300' },
        { name: '400 Level', value: '400' },
      ],
      states: [],
      departments: [
        { name: 'Medicine', value: 'MBBS' },
        { name: 'Anatomy', value: 'Anatomy' },
        { name: 'Physiology', value: 'Physiology' },
        { name: 'English Language', value: 'English Language' },
        { name: 'Mass. Comm.', value: 'Mass. Comm.' },
        { name: 'Accounting', value: 'Accounting' },
        { name: 'Business Admin.', value: 'Business Admin.' },
        { name: 'Economics', value: 'Economics' },
        { name: 'Political Science', value: 'Political Science' },
        { name: 'Sociology', value: 'Sociology' },
        { name: 'Christian Religious Studies', value: 'Christian Religious Studies' },
        { name: 'Law', value: 'Law' },
        { name: 'Industrial Chemistry', value: 'Industrial Chemistry' },
        { name: 'Computer Science', value: 'Computer Science' },
        { name: 'Bio-Chemistry', value: 'Bio-Chemistry' },
        { name: 'Microbiology', value: 'Microbiology' },
        { name: 'Industrial Physics', value: 'Industrial Physics' },
        { name: 'Mathematics & Statistics', value: 'Mathematics & Statistics' },
      ],
    };
  },
  methods: {
    showModal() {
      this.$modal.show('add_student');
    },
    hideModal() {
      this.clearForm();
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
          console.log(response);
          // eslint-disable-next-line
          if (response.status === 201) {
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
    clearForm() {
      this.student.surname = '';
      this.student.firstname = '';
      this.student.midname = '';
      this.student.regno = '';
      this.student.stateoforigin = '';
      this.student.dob = '';
      this.student.department = '';
      this.student.level = '';
    },
    loadStates() {
      this.$http
      // eslint-disable-next-line
        .get('http://locationsng-api.herokuapp.com/api/v1/states').then((response) => {
          if (response.status === 200) {
            this.states = response.body;
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.e('Error loading states!', 'SIMS');
          // eslint-disable-next-line
            console.log(response.body);
        });
    },
  },
  created() {
  // eslint-disable-next-line
    bus.$on('add_student', () => {
      this.loadStates();
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
