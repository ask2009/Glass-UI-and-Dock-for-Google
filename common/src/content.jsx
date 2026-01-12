// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";

import { createRoot } from "react-dom/client";
import {
  Switch,
  Separator,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ComboBox,
  ComboBoxItem,
  ComboBoxListBox,
  DisclosureContext,
  Disclosure,
  DisclosurePanel,
  TextArea,
  TextAreaContext,
  Input,
  Text,
  TextField,
  TextContext,
  Label,
  Heading,
} from "react-aria-components";
import { ChevronRight, PinIcon} from "lucide-react";

import './component/Button.css';
import './component/ComboBox.css';
import './component/Content.css';
import './component/Disclosure.css';
import './component/Form.css';
import './component/ListBox.css';
import './component/Popover.css';
import './component/Separator.css';
import './component/Switch.css';
import './component/Tabs.css';
import './component/theme.css';
import './component/utilities.css';



function App() {
  const appViewRef = useRef(null);
  const [dockVisible, setDockVisible] = useState(true);
  const [dockHover, setDockHover] = useState(false);
  const [lockDockHover, setLockDockHover] = useState(false);
  const [appViewVisible, setAppViewVisible] = useState(false);
  const toggleAppView = () => {
    setLockDockHover(prev => !prev);
    setAppViewVisible(prev => !prev);
    setDockVisible(true);
    setDockHover(true);
  };

  // Google検索ページで Dock の表示制御
  useEffect(() => {
    if (!window.location.href.includes("google.com/search?")) return;

    const checkVisibility = () => {
      const target = document.querySelector(".AaVjTc");
      if (!target) {
        setDockVisible(true);
        return;
      }
      const rect = target.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      setDockVisible(!isInViewport);
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    const observer = new MutationObserver(checkVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = event => {
      if (appViewRef.current && !appViewRef.current.contains(event.target)) {
        if (appViewVisible){
          toggleAppView(); 
          setLockDockHover(false);
          setDockHover(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [appViewVisible]);

  /*設定処理*/
  const storage =
  typeof chrome !== "undefined" && chrome.storage
    ? chrome.storage
    : typeof browser !== "undefined"
    ? browser.storage
    : null;

  const [apps, setApps] = useState([
    { href: "https://chatgpt.com" },
    { href: "https://icloud.com" },
    { href: "https://youtube.com" },
    { href: "https://epicgames.com" },
    { href: "https://github.com" },
    { href: "https://abema.tv" },
    { href: "https://x.com" },
  ]);

  const [pinnedAppInput, setPinnedAppInput] = useState(""); 
  useEffect(() => {
    (async () => {
      const result = await storage.local.get("pinnedApps");
      const savedApps = result.pinnedApps ?? [];
      if (savedApps.length) {
        setApps(savedApps);
        setPinnedAppInput(JSON.stringify(savedApps, null, 2));
      } else {
        setPinnedAppInput(JSON.stringify(apps, null, 2));
      }
    })();
  }, []);

  async function handleApplyPinnedApp() {
    const parsedApps = JSON.parse(pinnedAppInput);
    await storage.local.set({ pinnedApps: parsedApps });
    setApps(parsedApps);
  }
  
 


  return (
    <>
      <div
        id="dock-area"
        style={{ display: dockVisible ? "block" : "none" }}
        onMouseEnter={() => { if (!lockDockHover) setDockHover(true); }}
        onMouseLeave={() => { if (!lockDockHover) setDockHover(false); }}>
        <div
          id="dock"
          style={{
            transform: dockHover ? "translate(-50%, 0)" : "translate(-50%, 20px)",
            opacity: dockHover ? 1 : 0,
            transition: "transform 0.2s ease, opacity 0.2s ease",
          }}
        >
          <div id="pinned-app">
            {apps.map((app, i) => {
              const domain = new URL(app.href).hostname;
              const faviconUrl = `https://www.google.com/s2/favicons?sz=256&domain=${domain}`;
              return (
              <a key={i} href={app.href} target="_blank" rel="noopener noreferrer">
                <img src={faviconUrl} alt={app.href} />
              </a>
              );
            })}
          </div>
          <div id="app-menu">
            <button onClick={toggleAppView}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" height="24">
                <path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {appViewVisible && <div ref={appViewRef} id="app-view">
        <Tabs>
          <TabList>
            <Tab id="home">Home</Tab>
            <Tab id="setting">Setting</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="home">
              <div id="app-view-content">
                <a href="https://toshin.com/">東進</a>
              </div>
            </TabPanel>
            <TabPanel id="setting">
              <div>
                <Disclosure>
                  <Heading>
                    <Button slot="trigger"  className="disclosure-button">Pinned App<ChevronRight className="chevron" size={16}/>
                    </Button>
                  </Heading>
                  <DisclosurePanel class="setting-panel">
                    <TextField>
                      <Label>Select apps</Label>
                      <TextArea className="react-aria-TextArea inset setting-text-area" value={pinnedAppInput} onChange={(e) => setPinnedAppInput(e.target.value)}></TextArea>
                    </TextField>
                    <Button className="react-aria-Button button-base" onPress={handleApplyPinnedApp}>apply</Button>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure>
                  <Heading>
                    <Button slot="trigger"  className="disclosure-button">other App<ChevronRight className="chevron" size={16}/>
                    </Button>
                  </Heading>
                  <DisclosurePanel class="setting-panel">
                    <TextField>
                      <Label>Select apps</Label>
                      <TextArea className="react-aria-TextArea inset setting-text-area"></TextArea>
                    </TextField>
                    <Button className="react-aria-Button button-base">apply</Button>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>


        </div>}
    </>
  );
}




const container = document.createElement("div");
document.body.prepend(container);
const root = createRoot(container);
root.render(<App />);

