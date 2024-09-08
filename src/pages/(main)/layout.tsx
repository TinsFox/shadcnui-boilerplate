import { useRef } from "react"
import { Form, Link, Outlet, useSubmit } from "react-router-dom"

import { Logo } from "@/components/icons/logo"
import { Search } from "@/components/layout/search"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/hooks/query/use-user"

export function Component() {
  const user = useUser()

  return (
    <div className="flex h-screen flex-col justify-between">
      <header className="container py-6">
        <nav className="xs:flex-nowrap flex flex-nowrap items-center justify-between gap-4 md:gap-8">
          <div>
            <Logo className="size-12" />
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-auto hidden w-full flex-1 sm:block">
              <Search />
            </div>
            <div className="flex items-center gap-5">
              {user.data ? (
                <>
                  <Button asChild variant="ghost" size="lg">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <UserDropdown />
                </>
              ) : (
                <>
                  <Button asChild variant="default" size="lg">
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  )
}

function UserDropdown() {
  const user = useUser()

  const submit = useSubmit()
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button asChild variant="secondary">
          <Link
            to={`/users/${user.data?.username}`}
            // this is for progressive enhancement
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2"
          >
            <img
              className="size-8 rounded-full object-cover"
              alt={user.data?.username}
              src={user.data?.avatar}
            />
            <span className="font-bold">{user.data?.username}</span>
          </Link>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={8} align="start">
          <DropdownMenuItem asChild>
            <Link to={`/users/${user.data?.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            // this prevents the menu from closing before the form submission is completed
            onSelect={(event) => {
              event.preventDefault()
              submit(formRef.current)
            }}
          >
            <Form action="/logout" method="POST" ref={formRef}>
              <button type="submit">Logout</button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
