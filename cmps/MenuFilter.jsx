
export function MenuFilter({ setMarkedFolder, searchPrms, setSearchPrms, path, unreadMailsCount }) {
  return (
    <li>
      <button
        className={`${path} ${setMarkedFolder(path)} menu-title`}
        onClick={() => setSearchPrms({ status: path })}
      >
        {path}
        {
          unreadMailsCount && <span className="mail-counter">{unreadMailsCount}</span>
        }
      </button>
    </li>
  )
}
