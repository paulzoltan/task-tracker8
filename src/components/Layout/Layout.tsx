import './layout.css'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className='layout'>
    <div className='layout__bg-contanier layout__bg-contanier--left'></div>
    <div className='layout__crumple-zone layout__crumple-zone--left'></div>
    <div className='layout__container'>
      <div className='layout__header'>header</div>
      {children}
      <div className='layout__footer'>footer</div>
    </div>
    <div className='layout__crumple-zone layout__crumple-zone--right'></div>
    <div className='layout__bg-contanier layout__bg-contanier--right'></div>
  </div>
)
export default Layout
