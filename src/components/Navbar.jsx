import { Link } from "react-router-dom";

const Navbar = () => {
    const links = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "About", path: "/about" },
    ];

    return (
        <nav>
            <ul>
                {links.map((link) => (
                    <li key={link.id}>
                        <Link to={link.path}>{link.name}</Link>
                        </li>
                ))}
            </ul>
            </nav>            
    );
};

export defult Navbar;