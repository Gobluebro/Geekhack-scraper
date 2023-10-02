import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SimpleNavbar () {
  return (
    <Navbar height='full' isBordered maxWidth="2xl">
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Image className='m-3 pr-3' width='100' src='/logo.png' />
          <p className='hidden sm:block font-bold text-inherit'>GeekHacked</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as='div' className='items-center' justify="center">
          <NavbarItem>
            <Link color='foreground' href='/'>
              Home
            </Link>
          </NavbarItem>
      </NavbarContent>

      <NavbarContent as='div' className='items-center' justify='end'>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          disabled
          placeholder='Type to search...'
          size='sm'
          startContent={<FontAwesomeIcon icon={faSearch} />}
          type='search'
        />
      </NavbarContent>
    </Navbar>
  );
}
