import { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Image,
} from "@nextui-org/react";
import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function SimpleNavbar () {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      router.push(`/search?query=${value}`);
    }
  };

  return (
    <Navbar
      className='bg-gradient-to-tr from-indigo-500/20 to-teal-500/20 text-white'
      isBlurred
      height='full'
      maxWidth='full'
    >
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Image className='m-3 pr-2' width='75' src='/logo.png' />
          <p className='hidden sm:block font-bold text-inherit'>GeekHacked</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='items-center' justify='center' as='div'>
        <NavbarItem>
          <Link
            color='foreground'
            href='/'
            showAnchorIcon
            anchorIcon={<FontAwesomeIcon className='m-3' icon={faHome} />}
          >
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
          placeholder='Type to search...'
          size='sm'
          startContent={<FontAwesomeIcon icon={faSearch} />}
          type='search'
          onKeyDown={handleKeyDown}
          onValueChange={setValue}
        />
      </NavbarContent>
    </Navbar>
  );
}
