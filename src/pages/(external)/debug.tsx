export function Component() {
  return (
    <>
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        <span className="i-mgc-rss-cute-fi" />
        Build an Electron app with
        {" "}
        <span className="react">React</span>
        &nbsp;and
        {" "}
        <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
      </div>
    </>
  )
}
