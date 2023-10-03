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
      className='bg-zinc-700/40 text-white'
      isBordered
      isBlurred
      height='full'
      maxWidth='full'
    >
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Image className='m-3 pr-2' width='75' src='/logo.png' />
          <p className='text-4xl font-extralight hidden sm:block text-inherit text-white'>
            GeekHacked
          </p>
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
          variant='bordered'
          classNames={{
            base: "max-w-full sm:max-w-[15rem]",
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: ["border-white/10"],
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
