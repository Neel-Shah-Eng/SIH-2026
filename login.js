const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        const role =
            document.getElementById(
                "role"
            ).value;


        const message =
            document.getElementById(
                "loginMessage"
            );


        message.textContent =
            "Logging in...";


        try {

            const response =
                await fetch(
                    "http://localhost:3000/api/login",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify({

                            email: email,

                            password: password,

                            role: role

                        })

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                message.textContent =
                    result.error ||
                    "Login failed.";

                return;

            }


            // Save logged-in user

            localStorage.setItem(
                "sahayaUser",
                JSON.stringify(
                    result.user
                )
            );


            message.textContent =
                "Login successful!";


            // Redirect based on role

            setTimeout(
                function() {

                    if (role === "worker") {

                        window.location.href =
                            "worker-dashboard.html";

                    }

                    else if (role === "admin") {

                        window.location.href =
                            "admin-dashboard.html";

                    }

                    else {

                        window.location.href =
                            "dashboard.html";

                    }

                },
                500
            );


        }

        catch (error) {

            console.error(error);


            message.textContent =
                "Cannot connect to SAHAYA server.";

        }

    }
);