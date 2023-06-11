const app = Vue.createApp({
    data() {
        return {
            topicos: [], // Aquí se almacenarán los tópicos
            nuevoTopico: {
                titulo: '',
                mensaje: '',
                autor: '',
                curso: ''
            }
        };
    },
    methods: {registrarTopico() {
  // Verificar si el nuevoTopico tiene un ID asignado
  if (this.nuevoTopico.id) {
    // Realizar la actualización del tópico utilizando el método PUT
    fetch(`http://localhost:8085/topico/${this.nuevoTopico.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevoTopico)
    })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes realizar acciones adicionales después de actualizar el tópico, como actualizar la lista de tópicos o mostrar un mensaje de éxito
        console.log(data);
      })
      .catch(error => {
        // Manejo de errores en caso de que ocurra algún problema durante la actualización del tópico
        console.error(error);
      });

    // Reiniciar los campos del formulario
    this.nuevoTopico = {
      titulo: '',
      mensaje: '',
      autor: '',
      curso: '',
      id: ''
    };
  } else {
    // Si no hay un ID asignado, significa que se debe crear un nuevo tópico utilizando el método POST
    fetch('http://localhost:8085/topico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevoTopico)
    })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes realizar acciones adicionales después de enviar el formulario, como actualizar la lista de tópicos o mostrar un mensaje de éxito
        console.log(data);
      })
      .catch(error => {
        // Manejo de errores en caso de que ocurra algún problema durante el envío del formulario
        console.error(error);
      });

    // Reiniciar los campos del formulario
    this.nuevoTopico = {
      titulo: '',
      mensaje: '',
      autor: '',
      curso: '',
      id: ''
    };
  }
}
    }
});

app.mount('#app');