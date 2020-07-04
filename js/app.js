// *** Variables ***
const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;


// *** Clases ***
// Clases de Presupuesto
class Presupuesto {
     constructor(presupuesto) {
          this.presupuesto = Number(presupuesto);
          this.restante = Number(presupuesto);
     }
     // Método para ir restando el presupuesto actual
     presupuestoRestante(cantidad = 0) {
          return this.restante -= Number(cantidad);
     }

}

// Clase de Interfaz maneja todo lo relacionado al HTML

class Interfaz {
     insertarPresupuesto(cantidad){
          const presupuestoSpan = document.querySelector('span#total');
          const restanteSpan = document.querySelector('span#restante');

          // Insetar al HTML
          presupuestoSpan.innerHTML = `${cantidad}`;
          restanteSpan.innerHTML = `${cantidad}`;
     }
     imprimirMensaje(mensaje, tipo) {
          const divMensaje = document.createElement('div');
          divMensaje.classList.add('text-center', 'alert');
          if(tipo === 'error') {
               divMensaje.classList.add('alert-danger');
          } else {
               divMensaje.classList.add('alert-success');
          }
          divMensaje.appendChild(document.createTextNode(mensaje));
          // Insertar en el DOM
          document.querySelector('.primario').insertBefore(divMensaje, formulario);

          // Quitar el Alert después de 3segs
          setTimeout(function() {
               document.querySelector('.primario .alert').remove();
               formulario.reset();
          }, 3000);
     }
     // Agrega los gastos a la lista
     agregarGastoListado(nombre, cantidad) {
          const gastosListado = document.querySelector('#gastos ul');

          // Crear un LI
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          // Insertar el gasto
          li.innerHTML = `
          ${nombre}
          <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
          `;
          //Insertar al HTML
          gastosListado.appendChild(li);
     }

     // Comprueba el presupuesto restante
     presupuestoRestante(cantidad) {
          const restante = document.querySelector('span#restante');
          //Leemos el presupuesto restante/actualizamos
          const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
          
          restante.innerHTML = `${presupuestoRestanteUsuario}`;

          this.comprobarPresupuesto();
     }

     // Modifica el color del presupuesto restante
     comprobarPresupuesto(){
          const presupuestoTotal = cantidadPresupuesto.presupuesto;
          const presupuestoRestante = cantidadPresupuesto.restante;

          
          // Comprobar el 25% del gasto
          if( (presupuestoTotal / 4) > presupuestoRestante) {
               const restante = document.querySelector('.restante');
               restante.classList.remove('alert-success', 'alert-warning');
               restante.classList.add('alert-danger');
          } else if( (presupuestoTotal / 2) > presupuestoRestante) {
               const restante = document.querySelector('.restante');
               restante.classList.remove('alert-success');
               restante.classList.add('alert-warning');               
          }

     }
}


// *** Event Listeners ***
document.addEventListener('DOMContentLoaded', function() {
     if(presupuestoUsuario === null || presupuestoUsuario === '') {
          window.location.reload();
     } else {
          //Instancia un presupuesto
          cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
          // Instanciar la clase de Interfaz
          const ui = new Interfaz();
          ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
          
     }
});

formulario.addEventListener('submit',function(e){
     e.preventDefault();
     
     // Lectura del formulario "Gastos"
     const nombreGasto = document.getElementById('gasto').value; 
     const cantidadGasto = document.querySelector('#cantidad').value;

     // Instancia la Interfaz
     const ui = new Interfaz();

     // Comprobar que los campos no estén vacios
     if(nombreGasto === '' || cantidadGasto === '') {
          // 2 parámetros: Mensaje y Tipo
          ui.imprimirMensaje('Hubo un error', 'error');
     } else {
          // Insertar en el HTML
          ui.imprimirMensaje('Correcto', 'Correcto');
          ui.agregarGastoListado(nombreGasto, cantidadGasto);
          ui.presupuestoRestante(cantidadGasto);
     }
});