<template>
  <div id="app" class="app">

    <div class="header">

      <h1> Agendamiento de Citas Médicas (ACME) </h1>
      <nav>
        <button v-if="is_auth" v-on:click="loadHome"> Inicio </button>
        <button v-if="is_auth" v-on:click="loadCitas"> Citas </button>
        <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button>
        <button v-if="!is_auth" v-on:click="loadLogIn" > Iniciar Sesión </button>
        <button v-if="!is_auth" v-on:click="loadCAgendar_Cita"> Agendar Citas </button>
        <button v-if="!is_auth" v-on:click="loadSignUp" > Registrarse </button>
      </nav>
    </div>
    
    <div class="main-component">
      <router-view  
        v-on:completedLogIn="completedLogIn"
        v-on:completedCAgendar_Cita="completedCAgendar_Cita"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>    


    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>

  </div>

</template>




<script>
export default {
  name: 'App',

  computed: {
    is_auth: {
      get: function() {
        return this.$route.meta.requiresAuth;
      },
      set: function() { }
    }
  },

  methods:{

    loadLogIn: function(){
      this.$router.push({name: "logIn"})
    },

    loadSignUp: function(){
      this.$router.push({name: "signUp"})
    },

    completedLogIn: function(data) {
			localStorage.setItem("username", data.username);
			localStorage.setItem("token_access", data.token_access);
			localStorage.setItem("token_refresh", data.token_refresh);
			alert("Autenticación Exitosa");
			this.loadHome();
    },

    completedSignUp: function(data) {
			alert("Registro Exitoso");
			this.completedLogIn(data);
    },

    loadHome: function() {
      this.$router.push({ name: "home" });
    },

    loadCitas: function () {
			this.$router.push({ name: "Citas" });
		},

    loadCAgendar_Cita: function(){
      this.$router.push({ name: "CAgendar_Cita" });
    },

    logOut: function () {
			localStorage.clear();
			alert("Sesión Cerrada");
      this.loadLogIn();
		},
  }
}

</script>


<style>

  body{
    margin: 0 0 0 0;
    
  }

  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh; 
    min-height: 100px;

    background-color: #3f3f3f ;
    color:#fcfcfc  ;
    border: 1px solid #d4d649;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 50%;
    text-align: center;
  }

  .header nav {
    height: 100%;
    width: 45%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }

  .header nav button{
    color: #063f6b;
    background: #a0a0ad;
    border: 3px solid #d4d649;

    border-radius: 5px;
    padding: 10px 20px;
  }

  .header nav button:hover{
    color: #d4d649;
    background: #472840;
    border: 3px solid #d4d649;
  }

  
  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;

    background: #FDFEFE ;
    

  }

 
  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px; 

    background-color: #adb7c2;
    color: #3f3f3f;

  }

  .footer h2{
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
