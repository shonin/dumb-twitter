
class TestPassword {
    constructor() {
        console.log("foo bar");
    }
}

if(document.getElementById("id_test_password").checked) {
    TestPassword();
}

// set event listen on the checkbox
// when checked, prevent default on submit
// instead hash the password
