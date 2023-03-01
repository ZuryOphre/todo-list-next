import TodoList from '../components/todolist';
import Header from '../components/header';
import Footer from '../components/footer'

const Home = () => {
  return (
    <div>
      <Header />
      <TodoList />
      <Footer/>
    </div>
  );
};

export default Home;
