<template>
    <div class="container">
        <br />
        <section class="jumbotron text-center">
            <h3 class="header"> {{ header }} </h3>
            <section class="pull-right">
                <ul class="breadcrumb">
                    <li>
                        <router-link to="/landing"><icon name="home"></icon> Home </router-link>
                    </li>
                    <li class="active">
                        <icon name="users"></icon> All Students
                    </li>
                </ul>
            </section>
        </section>
        
        <br />
        <section class="content jumbotron" id="table_section">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title"></h3>
                            <div class="pull-left">
                                <a class="btn btn-sm btn-default" v-on:click="showModal()"><icon name="plus"></icon> Add a student </a>
                            </div>
                            <div class="pull-right">
                                <input v-model="searchKey" class="form-control" id="searchKey" placeholder="Search...." required/>
                            </div>
                        </div>
                        <br /><br /><br />
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th></th> 
                                        <th>Surname</th> 
                                        <th>First name</th> 
                                        <th>Reg. no</th> 
                                        <th>State of origin</th> 
                                        <th>Date of birth</th> 
                                        <th>Department</th> 
                                        <th>Level</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="student in filteredStudents">
                                        <td></td>
                                        <td>{{student.surname}}</td>
                                        <td>{{student.firstname}}</td>
                                        <td>{{student.regno}}</td>
                                        <td>{{student.stateoforigin}}</td>
                                        <td>{{student.dob}}</td>
                                        <td>{{student.department}}</td>
                                        <td>{{student.level}}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <modal name="add_student" :pivotY="0.3" :height="600" >
            <form v-on:submit.prevent="addStudent">
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
                                <input class="form-control" type="datetime" id="dob" v-model="student.dob" required/>
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
export default {
  name: 'StudentList',
  data() {
    return {
      header: 'Students',
      students: [],
      searchKey: '',
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
    getStudents() {
      this.$http
        .get('http://localhost:4000/api/students').then((response) => {
          if (response.status === 200) {
            this.students = response.data;
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.e('Error!');
          // eslint-disable-next-line
            console.log(response.data);
        });
    },
    showModal() {
      this.$modal.show('add_student');
    },
    hideModal() {
      this.$modal.hide('add_student');
    },
    addStudent() {
      this.$http
        .post('http://localhost:4000/api/students', this.student, {
          emulateJSON: true,
        })
        .then((response) => {
          // eslint-disable-next-line
          if (response.status === 201) {
            this.hideModal();
            this.$refs.toastr.s('Student added!');
            this.router.push({ name: 'students' });
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.s('Error: ' + response.body);
        });
    },
  },
  computed: {
    // eslint-disable-next-line
    filteredStudents() {
      if (this.students.length) {
        // eslint-disable-next-line
        return this.students.filter(function (student) {
          return this.searchKey.toLowerCase === '' || student.surname.toLowerCase().indexOf(this.searchKey) !== -1 || student.firstname.toLowerCase().indexOf(this.searchKey) !== -1;
        }, this);
      }
      return this.students;
    },
  },
  beforeMount() {
    this.getStudents();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-weight: bold;
  font-family: Tahoma;
}
span {
  font-family: Tahoma;
}
#table_section{
    background: white;
    padding: 10px;
    margin: 10px;
}
.jumbotron{
    background: white;
}
.modal-text{
    color: blueviolet;
}
</style>
