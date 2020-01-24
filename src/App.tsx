import TodoList from "./TodoList";
import Welcome from "./Welcome";
import styles from "./App.module.css";
import React from "react";

enum Nav {
    Welcome,
    TodoList,
}

interface NavEntryProps {
    readonly children: React.ReactNode;
    readonly nav: Nav;
    readonly selectedNav: Nav;
    readonly setSelectedNav: (newSelectedNav: Nav) => void;
}

function NavEntry(props: NavEntryProps): JSX.Element {
    const {children, nav, selectedNav, setSelectedNav} = props;
    return (
        <div
            className={nav === selectedNav ? styles.navEntrySelected : styles.navEntry}
            onClick={(): void => { setSelectedNav(nav); }}
        >
            {children}
        </div>
    );
}

export default function App(): JSX.Element {
    const [selectedNav, setSelectedNav] = React.useState(Nav.Welcome);
    let content: React.ReactNode;
    switch (selectedNav) {
        case Nav.Welcome:
            content = <Welcome />;
            break;
        case Nav.TodoList:
            content = <TodoList />;
            break;
    }
    return <>
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.branding}>
                    CRFS Todo Manager
                </div>
            </div>
        </div>
        <div className={styles.nav}>
            <div className={styles.container}>
                <NavEntry nav={Nav.Welcome} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>
                    Welcome
                </NavEntry>
                <NavEntry nav={Nav.TodoList} selectedNav={selectedNav} setSelectedNav={setSelectedNav}>
                    Todo
                </NavEntry>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.content}>
                {content}
            </div>
        </div>
    </>;
}
