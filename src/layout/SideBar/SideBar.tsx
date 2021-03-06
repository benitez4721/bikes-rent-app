import { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { BsFillPersonFill, BsBicycle, BsClipboardCheck } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext/AuthProvider'

interface LinkItemProps {
  name: string
  icon: any
  route: string
}
const AdminLinkItems: Array<LinkItemProps> = [
  { name: 'Users', icon: BsFillPersonFill, route: 'users' },
  { name: 'Bikes', icon: BsBicycle, route: 'bikes' },
  { name: 'Reserves', icon: BsClipboardCheck, route: 'reserves' },
]

const UserLinkItems: Array<LinkItemProps> = [
  { name: 'Bikes', icon: BsBicycle, route: 'bikes' },
  { name: 'My reservations', icon: BsClipboardCheck, route: 'reserves' },
]

export default function SideBar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='8' background='white' minHeight='100vh'>
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isAdmin, user, logOut } = useAuth()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
      display='flex'
      flexDirection='column'
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='1rem' fontFamily='monospace' fontWeight='bold'>
          {`${user.firstName} ${user.lastName}`}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {(isAdmin ? AdminLinkItems : UserLinkItems).map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
      <Box w='100%' h='56px' px={4} mt='auto' mb={'2rem'}>
        <Button
          h='100%'
          w='100%'
          _hover={{ background: 'gray.100 ' }}
          background='white'
          justifyContent='flex-start'
          fontWeight='normal'
          leftIcon={<Icon mr='2' fontSize='18' as={BiLogOut} />}
          onClick={logOut}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: any
  children: any
  route: string
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  const { pathname } = useLocation()
  const itemStyle = pathname.includes(route) ? { bg: 'cyan.400', color: 'white' } : {}
  return (
    <NavLink style={{ textDecoration: 'none' }} to={route}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        {...itemStyle}
        {...rest}
      >
        {icon && <Icon mr='4' fontSize='16' as={icon} />}
        {children}
      </Flex>
    </NavLink>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<DownloadIcon />}
      />

      <Text fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold'>
        Logo
      </Text>
    </Flex>
  )
}
