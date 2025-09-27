
function setAlert(message, type) {
  return `<p class="alert alert-${type} d-flex justify-content-between">
            ${message}
            <button data-bs-dismiss="alert" class="btn-close"></button>
          </p>`;
}