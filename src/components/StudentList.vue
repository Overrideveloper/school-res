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
                                <a class="btn btn-sm btn-default" href="#"><icon name="plus"></icon> Add a student </a>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="student in students">
                                        <td></td>
                                        <td>{{student.surname}}</td>
                                        <td>{{student.firstname}}</td>
                                        <td>{{student.regno}}</td>
                                        <td>{{student.stateoforigin}}</td>
                                        <td>{{student.dob}}</td>
                                        <td>{{student.department}}</td>
                                        <td>{{student.level}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'StudentList',
  data() {
    return {
      header: 'All Students',
      students: [],
    };
  },
  methods: {
    getStudents() {
      this.$http
        .get('http://localhost:4000/api/students').then((response) => {
          if (response.status === 200) {
            this.students = response.body;
          }
          if (response.status !== 200) {
            // eslint-disable-next-line
            console.log(response.body);
          }
        });
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
</style>
