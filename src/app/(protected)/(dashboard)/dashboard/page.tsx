import { logout } from "@/actions/auth.action";

export default function page() {
    return <div>dashboard

        <div>
            <button onClick={logout}>logout</button>
        </div>
    </div>;
}
