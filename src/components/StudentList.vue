<template>
    <div class="container">
        <br />
        <section class="jumbotron text-center">
            <h3 class="header"> {{ header }} </h3>
            <br/>
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
                                        <th>Registration number</th> 
                                        <th>Surname</th> 
                                        <th>First name</th>
                                        <th>Department</th> 
                                        <th>Level</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <paginate name="student_list" :list="filteredStudents" :per="5" tag="tbody">
                                    <tr v-for="student in paginated('student_list')">
                                        <td>{{student.regno}}</td>
                                        <td>{{student.surname}}</td>
                                        <td>{{student.firstname}}</td>
                                        <td>{{student.department}}</td>
                                        <td>{{student.level}}</td>
                                        <td>
                                            <a class="btn btn-xs btn-info" v-on:click="openEdit(student._id)"><icon name="pencil-square-o"></icon> Edit</a>
                                            <a class="btn btn-xs btn-danger" v-on:click="openDelete(student._id)"><icon name="trash-o"></icon> Delete</a>
                                            <a class="btn btn-xs btn-success" v-on:click="openView(student._id)"><icon name="folder-open-o"></icon> View details</a>
                                        </td>
                                    </tr>
                                </paginate>
                                <paginate-links for="student_list" class="pagination" :show-step-links="true" :step-links="{ prev: 'Prev', next: 'Next'}"></paginate-links>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <vue-toastr ref="toastr"></vue-toastr>
        <vue-toastr ref="loading"></vue-toastr>
        <add-student></add-student>
        <edit-student></edit-student>
        <delete-student></delete-student>
        <student-details></student-details>
    </div>
</template>

<script>
import bus from '../bus/bus';
import AddStudent from '../components/AddStudent';
import EditStudent from '../components/EditStudent';
import DeleteStudent from '../components/DeleteStudent';
import StudentDetails from '../components/StudentDetails';

const URL = 'https://schoolinfoapp.herokuapp.com';
export default {
  name: 'StudentList',
  data() {
    return {
      header: 'STUDENT INFORMATION MANAGEMENT SYSTEM [SIMS] ',
      students: [],
      searchKey: '',
      paginate: ['student_list'],
    };
  },
  components: {
    AddStudent,
    EditStudent,
    DeleteStudent,
    StudentDetails,
  },
  methods: {
    getStudents() {
      this.$http
      // eslint-disable-next-line
        .get(URL + '/api/students').then((response) => {
          this.$refs.loading.i('Loading...', 'SIMS');
          if (response.status === 200) {
            this.$refs.loading.removeByType('info');
            this.$refs.toastr.s('Loading complete!', 'SIMS');
            this.students = response.body;
          }
          // eslint-disable-next-line
        }, response => {
          // eslint-disable-next-line
            this.$refs.toastr.e('Error loading!', 'SIMS');
          // eslint-disable-next-line
            console.log(response.body);
        });
    },
    openCreate() {
    // eslint-disable-next-line
      bus.$emit('add_student');
    },
    openEdit(id) {
      // eslint-disable-next-line
      bus.$emit('edit_student', { studentId : id});
    },
    openDelete(id) {
      // eslint-disable-next-line
      bus.$emit('delete_student', { studentId : id});
    },
    openView(id) {
      // eslint-disable-next-line
      bus.$emit('student_details', { studentId : id});
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
