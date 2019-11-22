
class TestPassword {
    constructor() {
        this.form = document.getElementById("login_form");
        this.preventFormSubmit();


    }

    preventFormSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addPasswordInformationOnSubmit();
        })
    }

    addPasswordInformationOnSubmit() {
        document.getElementById("password_card").classList.remove("hidden");
    }
}

// set event listen on the checkbox
// when checked, prevent default on submit
// instead hash the password

let checkbox = document.getElementById("id_test_password");

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        new TestPassword();
    }
});
