<template>
  <div>
        <modal name="delete_student" :pivotY="0.1" :height="220" >
            <form v-on:submit.prevent="deleteStudent(); hideModal();">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="hideModal()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title text-center modal-text"><b>Delete {{student.surname}} {{student.firstname}}</b></h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-9">
                                <center class="modal-text text-center"><h4>Are you sure you want to delete this?</h4></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left" v-on:click="hideModal()">Close</button>
                    <input type="submit" class="btn btn-danger" value="Delete"/>
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
  name: 'DeleteStudent',
  data() {
    return {
      student: [],
    };
  },
  methods: {
    showModal() {
      this.$modal.show('delete_student');
    },
    hideModal() {
      this.$modal.hide('delete_student');
    },
    deleteStudent() {
      this.$http
      // eslint-disable-next-line
        .delete(URL + '/api/students/' + this.student._id, {
          emulateJSON: true,
        })
        .then((response) => {
          // eslint-disable-next-line
          if (response.status === 200) {
            bus.$emit('load_students');
            this.$refs.toastr.s('Student deleted!', 'SIMS');
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.s('Error deleting!', 'SIMS');
        });
    },
    loadStudent(studentId) {
      this.$http
      // eslint-disable-next-line
        .get(URL + '/api/students/' + studentId.studentId)
        .then((response) => {
          if (response.status === 200) {
            this.student = response.data;
            this.showModal();
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
          this.$refs.toastr.e('Error loading!', 'SIMS');
          // eslint-disable-next-line
          console.log(response.data);
        });
    },
  },
  created() {
  // eslint-disable-next-line
    bus.$on('delete_student', (studentId) => {
      this.loadStudent(studentId);
    });
  },
};
</script>

<style scoped>
  .modal-text{
    color: blueviolet;
  }
</style>
