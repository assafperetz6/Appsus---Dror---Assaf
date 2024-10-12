const { createContext, useContext } = React

const MailContext = createContext()

export function useMailContext() {
    return useContext(MailContext)
}

export { MailContext }