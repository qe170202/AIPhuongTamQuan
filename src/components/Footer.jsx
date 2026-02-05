const Footer = () => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <a href="#!">
          <img src="/assets/logo.png" alt="" className="w-36 mx-auto mb-2 dark:hidden" />
          <img src="/assets/logo_dark.png" alt="" className="w-36 mx-auto mb-2 hidden dark:block" />
        </a>
        <div className="w-max flex items-center gap-2 mx-auto">
          <img src="/assets/mail_icon.png" alt="" className="w-5 dark:hidden" />
          <img src="/assets/mail_icon_dark.png" alt="" className="w-5 hidden dark:block" />
          <a href="#!">contact@prebuiltui.com</a>
        </div>
      </div>
      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-3">
        <p>
          © 2025 <a href="https://prebuiltui.com/" target="_blank" rel="noopener noreferrer">PrebuiltUI</a>. All rights reserved. Distributed by{' '}
          <a href="https://themewagon.com" target="_blank" rel="noopener noreferrer">ThemeWagon</a>
        </p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          <li>
            <a target="_blank" href="#!" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a target="_blank" href="#!" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a target="_blank" href="#!" rel="noopener noreferrer">Twitter</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
