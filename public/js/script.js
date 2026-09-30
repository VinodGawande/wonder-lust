(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// --- TAX SWITCH TOGGLE LOGIC ---
const taxToggle = document.getElementById("taxToggle");
if (taxToggle) {
  taxToggle.addEventListener("click", () => {
    const taxTags = document.querySelectorAll(".tax-tag");
    for (let tag of taxTags) {
      tag.classList.toggle("d-none");
    }
  });
}