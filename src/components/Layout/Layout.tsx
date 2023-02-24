import './layout.css'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className='layout'>
    <div className='layout__bg-contanier--outer '>
      <div className='layout__bg-contanier--left--inner'></div>
    </div>
    <div className='layout__crumple-zone'></div>
    <div className='layout__container'>
      <Header />
      <div className='negative-space'></div>
      {children}
      <Footer />
    </div>
    <div className='layout__crumple-zone'></div>
    <div className='layout__bg-contanier--outer '>
      <div className='layout__bg-contanier--right--inner'></div>
    </div>
  </div>
)
export default Layout
