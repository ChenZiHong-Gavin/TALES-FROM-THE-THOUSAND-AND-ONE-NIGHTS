import { NavLink, useRoutes } from 'react-router-dom';
import { useState } from 'react';
import routes from './routes';

const App = () => {
  const ElementRouter = useRoutes(routes);
  const [items] = useState([
    { name: 'Home', path: '/' },
    { name: 'Selection', path: '/selection' },
  ]);

  return (
		<div className='app'>
			<nav className='nav'>
				<div className='w'>
          	{/* 路由链接 */}
					{items.map(item => (
						<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={item.path} key={item.path}>
							{item.title}
						</NavLink>
					))}
				</div>
			</nav>
			{/* 注册路由 */}
			{ElementRouter}
		</div>
  );
};

export default App;
