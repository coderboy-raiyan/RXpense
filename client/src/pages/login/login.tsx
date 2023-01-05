import Header from "components/Header/Header";

function Login() {
    return (
        <>
            <Header />
            <section>
                <form>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                </form>
            </section>
        </>
    );
}

export default Login;
