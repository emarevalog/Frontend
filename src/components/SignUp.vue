<template>

    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Registrarse</h2>

            <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="Paciente.nombre" placeholder="Nombre">
                <br>

                <input type="text" v-model="Paciente.apellido" placeholder="Apellido">
                <br>

                <input type="text" v-model="Paciente.cedula" placeholder="Cédula">
                <br>
                
                <input type="password" v-model="Paciente.contraseña" placeholder="Contraseña">
                <br>
                
                <input type="text" v-model="Paciente.telefono" placeholder="Telefono">
                <br>

                <input type="email" v-model="Paciente.email" placeholder="Correo">
                <br>

                <button type="submit">Registrarse</button>
            </form>
        </div>

    </div>

</template>


<script>
import gql from "graphql-tag";

export default {
    name: "SignUp",

    data: function() {
        return {
        Paciente: {
            nombre: "",
            apellido: "",
            cedula: "",
            contraseña: "",
            telefono: "",
            correo: "",
            direccion: "",

        },
        };
    },

  methods: {
    processSignUp: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($userInput: SignUpInput!) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            cedula: this.Paciente.cedula,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };

          this.$emit("completedSignUp", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR: Fallo en el registro.");
        });
    },

  },
}
</script>


<style>

    .signUp_user{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
    
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .container_signUp_user {
        border: 3px solid  #283747;
        border-radius: 10px;
        width: 25%;
        height: 95%;

        background-color: #adb7c2;
        color: #3f3f3f;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .signUp_user h2{
        color: #283747;

    }

    .signUp_user form{
        
        width: 70%;
        
    }

    .signUp_user input{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .signUp_user button{
        width: 100%;
        height: 40px;

        color: #ffffff;
        background: #3f3f3f;
        border: 3px solid #d4d649;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .signUp_user button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>