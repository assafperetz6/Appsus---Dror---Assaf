

export function MenuFilter({ setMarkedFolder, setSearchPrms, path }) {
  return (
    <li>
      <button
        className={`${path} ${setMarkedFolder(path)} menu-title`}
        onClick={() => setSearchPrms({ status: path })}
      >
        {path}
      </button>
    </li>
  )
}
