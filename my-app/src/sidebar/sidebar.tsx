import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import HomeIcon from "../logo.svg"

interface navItem {
    name: string;
    icon?: JSX.Element;
    link: string;
    selected: boolean;
    id: number;
}

function Sidebar(props: {pageID: string}) {

    const [navItems, setNavItems] = useState([
        {'name': 'Products', 'link': '/products', 'selected': false, 'id': 1},
        {'name': 'Inventory', 'link': '/inventory', 'selected': false, 'id': 2},
        {'name': 'Statistics', 'link': '/statistics', 'selected': false, 'id': 3},
    ]);

    navItems.map((item) => {
        if (+props.pageID === item.id) {
            item.selected = true;
        }
    });

    const initMenuButtonState = window.innerWidth > 768 ? "block" : "hidden";
    const [sidebarState, setSidebarState] = useState(initMenuButtonState)

    // Remove or add side bar navigation if window width is too small
    window.addEventListener('resize', () => {
		if(window.innerWidth < 768) {
			// setMenuButton("block");
			setSidebarState("hidden");
		} else {
			// setMenuButton("hidden");
			setSidebarState("block");
		}
        console.log(sidebarState);
	});

    // Returns JSX element of the sidebar nav component
    function createNavComponent(item: navItem): JSX.Element {
        let styles = "my-1 py-4 px-10 bg-indigo-200 rounded-r-lg cursor-pointer transition-all hover:bg-slate-400 active:bg-slate-500";
        if (item.selected) {
            styles += " bg-[#b6c8e3]";
        }
        return <a href={item.link}><li className={styles}>
            {item.name}
        </li></a>;
    }


    return (
        <aside className={sidebarState + " fixed left-0 w-64 h-screen bg-indigo-100 flex flex-col"}>
            <ul>
                <a href="/"><img src={HomeIcon} alt="Logo"></img></a>

                {navItems.map((item) => {
                    return (createNavComponent(item));
                })}
            </ul>
        </aside>
    );
}

export default Sidebar;