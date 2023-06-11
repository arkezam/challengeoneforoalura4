const app = Vue.createApp({
    data() {
        return {
            topicos: [],
            editarModal: false,
            topicoSeleccionado: null,
            nuevoTopico: {
                titulo: "",
                mensaje: "",
                autor: "",
                curso: "",
            },
        };
    },
    created() {
        this.obtenerTopicos();
        this.mostrarModal();
    },
    methods: {
        formatDate(dateArray) {
            const [year, month, day] = dateArray;
            const fecha = new Date(year, month - 1, day);
            return fecha.toLocaleDateString();
        },
        obtenerTopicos() {
            fetch('http://localhost:8085/topico')
                .then(response => response.json())
                .then(data => {
                    this.topicos = data.content;
                })
                .catch(error => {
                    console.error('Error al obtener los datos:', error);
                });
        },
        deleteTopico(id) {
            fetch(`http://localhost:8085/topico/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                // Remover el tópico eliminado de la lista visualmente
                this.topicos = this.topicos.filter(topico => topico.id !== id);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        },
        actualizarTopico() {
            // Get the id of the topic to be updated
            const id = this.topicoSeleccionado.id;
      
            // Create a new object with the updated data
            const nuevoTopico = {
              titulo: this.topicoSeleccionado.titulo,
              mensaje: this.topicoSeleccionado.mensaje,
              autor: this.topicoSeleccionado.autor,
              curso: this.topicoSeleccionado.curso
            };
      
            // Update the topic in the database
            fetch(`http://localhost:8085/topico/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(nuevoTopico)
            })
              .then(response => {
                if (response.ok) {
                  console.log('Topico actualizado correctamente');
                  // Aquí puedes realizar acciones adicionales después de actualizar el tópico
                } else {
                  throw new Error('Error al actualizar el tópico');
                }
              })
              .catch(error => {
                console.error('Error al actualizar el tópico:', error);
              });
          },
        mostrarModal() {
            this.editarModal = true;
            this.topicoSeleccionado = this.topicos.find(topico => topico.id === this.$event.target.dataset.id);
        },
        cerrarModal() {
            this.editarModal = false;
            this.topicoSeleccionado = null;
        },
    }
});

app.mount('#app');
