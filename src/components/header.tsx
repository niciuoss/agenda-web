import { Cake, Home, UtensilsCrossed, SquareGanttChart, Clock8 } from 'lucide-react';
import { Separator } from "./ui/separator.tsx";
import { NavLink } from './nav-link.tsx';
import { ThemeToggle } from './theme/theme-toggle.tsx';
import { AccountMenu } from './account-menu.tsx';

export function Header(){
  return(
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Cake className="h-6 w-6"/>
        <Separator orientation="vertical" className="h-6"/>

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4"/>
            Home
          </NavLink>
          <NavLink to="/orders">
            <SquareGanttChart className="h-4 w-4"/>
            Histórico
          </NavLink>
          <NavLink to="/schedule">
            <Clock8 className="h-4 w-4"/>
            Agendamentos
          </NavLink>
        </nav>

        <div className='ml-auto flex items-center gap-2'>
          <ThemeToggle/>
          <AccountMenu/>
        </div>

      </div>
    </div>
  )
}