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
                                <a class="btn btn-sm btn-default" v-on:click="openCreate"><icon name="plus"></icon> Add a student </a>
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
                                        <td>
                                            <a class="btn btn-xs btn-info" v-on:click="openEdit(student._id)">Edit</a>
                                            <a class="btn btn-xs btn-danger">Delete</a>
                                            <a></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <vue-toastr ref="toastr"></vue-toastr>
        <add-student></add-student>
        <edit-student></edit-student>
    </div>
</template>

<script>
import bus from '../bus/bus';
import AddStudent from '../components/AddStudent';
import EditStudent from '../components/EditStudent';

const URL = 'https://schoolinfoapp.herokuapp.com';
export default {
  name: 'StudentList',
  data() {
    return {
      header: 'Students',
      students: [],
      searchKey: '',
    };
  },
  components: {
    AddStudent,
    EditStudent,
  },
  methods: {
    getStudents() {
      this.$http
      // eslint-disable-next-line
        .get(URL + '/api/students').then((response) => {
          if (response.status === 200) {
            this.students = response.body;
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.e('Error!');
          // eslint-disable-next-line
            console.log(response.data);
        });
    },
    openCreate() {
    // eslint-disable-next-line
      bus.$emit('add_student');
    },
    openEdit(id) {
      // eslint-disable-next-line
      console.log('ID: ' + id);
      // eslint-disable-next-line
      bus.$emit('edit_student', { studentId : id});
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
  created() {
    bus.$on('load_students', () => {
      this.getStudents();
    });
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
</style>
