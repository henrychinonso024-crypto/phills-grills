const loginBtn =
document.getElementById(
    "loginBtn"
);

loginBtn.addEventListener(
    "click",
    async () => {

        const email =
        document.getElementById(
            "email"
        ).value;

        const password =
        document.getElementById(
            "password"
        ).value;

        const { error } =
        await window.supabaseClient.auth
        .signInWithPassword({

            email,
            password

        });

        if (error) {

            alert(
                error.message
            );

            return;

        }

        window.location.href =
        "admin.html";

    }
);