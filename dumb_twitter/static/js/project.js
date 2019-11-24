import sha1 from 'js-sha1';

class TestPassword {
    constructor() {
        this.form = document.getElementById("login_form");
        this.formHandler = this.preventFormSubmit.bind(this);

        // learning moment: the scope of this.preventFormSubmit, when actually run
        // is within the document.body -- when run 'this' will refer to the form.
        // by binding this to the class function it prevents this from happening.
        this.form.addEventListener("submit", this.formHandler);

        // this.preventFormSubmit();

    }

    preventFormSubmit(e) {
        console.log("preventFormSubmit run");
        e.preventDefault();
        this.startPasswordCheck();
    }

    startPasswordCheck() {
        document.getElementById("password_card").classList.remove("hidden");

        let password = document.getElementById("id_password").value;

        let password_sha1 = sha1(password).toUpperCase();
        let first_five = password_sha1.slice(0, 5);

        const url = `https://api.pwnedpasswords.com/range/${first_five}`;

        fetch(url)
            .then( data => data.text() )
            .then( (res) => {
                this.getResults(password_sha1, res)
            })
    }

    getResults(password_sha1, password_list) {
        let isPasswordCompromised = false;
        let compromisedSha1 = '';

        password_list.split('\n').forEach( n => {
            if(n.includes(password_sha1.slice(5))) {
                isPasswordCompromised = true;
                compromisedSha1 = n;
            }
        });

        this.giveUserResults(isPasswordCompromised, compromisedSha1);
    }

    giveUserResults(isPasswordCompromised, compromisedSha1) {
        let header, body, class1, class2, removeClass;

        if(isPasswordCompromised) {
            let timesCompromised = compromisedSha1.slice(compromisedSha1.indexOf(':')+1);

            header = "Warning";
            body =
                `Your password has been involved in ${timesCompromised} data breach(es). 
                <a href="https://haveibeenpwned.com/Passwords" target="_blank">Learn more here</a>.
                <br/>Submit the form again to continue.`;
            class1 = "bg-danger";
            class2 = "text-white";

            removeClass = "bg-success";
        } else {
            header = "No password breach detected";
            body =
                `<a href="https://haveibeenpwned.com/Passwords" target="_blank">Learn more here</a>.
                 <br/>Submit the form again to continue.`;
            class1 = "bg-success";
            class2 = "text-white";

            removeClass = "bg-danger";
        }

        if(document.querySelector("#password_card").classList.contains(removeClass)) {
            document.querySelector("#password_card").classList.remove(removeClass);
        }

        document.querySelector("#password_card .card-title").innerHTML = header;
        document.querySelector("#password_card .card-text").innerHTML = body;
        document.querySelector("#password_card").classList.add(class1, class2);

        this.form.removeEventListener("submit", this.formHandler);
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


