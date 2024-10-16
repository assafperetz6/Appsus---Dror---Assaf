const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { MainMenu } from "./cmps/MainMenu.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDashboard } from "./apps/mail/cmps/MailDashBoard.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"

import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { NoteEditModal } from "./apps/note/cmps/NoteEditModal.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <MainMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/details/:mailId" element={<MailDetails />}/>
                    <Route index path="/mail/inbox" element={<MailDashboard />}/>
                    <Route path="/mail/:status" element={<MailDashboard />}/>
                    <Route path="" element={<Navigate to="/mail/inbox" replace />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/edit/:noteId" element={<NoteEditModal />} />
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>

            <UserMsg />
        </section>
    </Router>
}