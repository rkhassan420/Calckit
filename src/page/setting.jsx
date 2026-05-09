import Header from "../components/header"
import "./setting.css"
import no_tick from '../assets/not_tick.png'
import tick from '../assets/tick.png'
import icon from '../assets/icon.png'
import theme_icon from '../assets/theme.png'
import theme_dark from '../assets/theme_dark.png'
import { useContext } from "react"
import { ThemeContext } from "../theme/ThemeContext"


const Setting = () => {

    const { theme, handleDarkTheme, handleLightTheme } = useContext(ThemeContext);

    return (
        <div className="setting-wrapper">
            <Header />

            <div className="little-container" >
                {/* ── Appearance section ── */}
                <div className="theme-toper" >
                    <p>Appearance</p>
                </div>

                <div className="theme-container">
                    <div>
                        <img
                            src={theme === 'dark-theme' ? theme_dark : theme_icon}
                            alt="theme icon"
                        />
                    </div>
                    <div   >
                        <h4>App Theme</h4>
                        <p className="theme-title">Select which app theme to display</p>
                    </div>
                </div>

                <div className="theme-btn">
                    <ul>
                        <li onClick={handleLightTheme}>
                            <img src={theme === "light-theme" ? tick : no_tick} alt="light" />
                            <p>Light</p>
                        </li>
                        <li onClick={handleDarkTheme}>
                            <img src={theme === "dark-theme" ? tick : no_tick} alt="dark" />
                            <p>Dark</p>
                        </li>
                       
                    </ul>
                </div>

                {/* ── About section ── */}
                <div className="theme-about-title">
                    <p>About</p>
                </div>

                <div className="theme-about">
                    <div>
                        <img src={icon} alt="app icon" />
                    </div>
                    <div>
                        <h4>Calculator&apos;s</h4>
                        <p className="theme-rights">&copy; 2025 Ali Hassan. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;