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
        <nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
          <Logo className="size-12" />
          <div className="ml-auto hidden max-w-sm flex-1 sm:block">
            <Search />
          </div>
          <div className="flex items-center gap-10">
            {user.data ? (
              <>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <UserDropdown />
              </>
            ) : (
              <Button asChild variant="default" size="lg">
                <Link to="/signin">Log In</Link>
              </Button>
            )}
          </div>
          <div className="block w-full sm:hidden">
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </nav>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <div className="container flex justify-between pb-5">
        <Logo className="size-12" />
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
          <DropdownMenuItem asChild>
            <Link to={`/users/${user.data?.username}/notes`}>Notes</Link>
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
