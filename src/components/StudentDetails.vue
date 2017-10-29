<template>
    <div>
        <modal name="student_details" :pivotY="0.3" :height="570" >
            <form>
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="hideModal()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title text-center modal-text"><b> {{student.surname}} {{student.firstname}}</b></h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="surname" class="control-label col-sm-3 modal-text"> Surname </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="surname">{{student.surname}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="fname" class="control-label col-sm-3 modal-text"> First Name </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="fname">{{student.surname}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="midname" class="control-label col-sm-3 modal-text"> Middle Name </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="midname">{{student.midname}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="regno" class="control-label col-sm-3 modal-text"> Registration Number </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="regno">{{student.regno}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="dept" class="control-label col-sm-3 modal-text"> Department </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="dept">{{student.department}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="level" class="control-label col-sm-3 modal-text"> Level </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="level">{{student.level}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="dob" class="control-label col-sm-3 modal-text"> Date of Birth </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="dob">{{student.dob}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="state" class="control-label col-sm-3 modal-text"> State of Origin </label>
                            <div class="col-sm-6">
                                <span class="form-control" id="state">{{student.stateoforigin}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success pull-right" v-on:click="hideModal()">Close</button>
                </div>
            </form>
        </modal>
    </div>
</template>

<script>
import bus from '../bus/bus';

const URL = 'https://schoolinfoapp.herokuapp.com';
export default {
  name: 'StudentDetails',
  data() {
    return {
      student: [],
    };
  },
  methods: {
    showModal() {
      this.$modal.show('student_details');
    },
    hideModal() {
      this.$modal.hide('student_details');
    },
    loadStudent(studentId) {
      this.$http
      // eslint-disable-next-line
        .get(URL + '/api/students/' + studentId.studentId)
        .then((response) => {
          if (response.status === 200) {
            this.student = response.body;
            this.showModal();
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
          this.$refs.toastr.e('Error loading!', 'SIMS');
          // eslint-disable-next-line
          console.log(response.body);
        });
    },
  },
  created() {
  // eslint-disable-next-line
    bus.$on('student_details', (studentId) => {
      this.loadStudent(studentId);
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