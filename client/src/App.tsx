import { AllChats, Chat, Container, Header } from '@/components/shared';

function App() {
  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-76px)] p-5 bg-gray-600 flex justify-center items-center">
        <Container className="w-[100%] p-15 bg-white flex flex-row rounded-md">
          <Chat />
          <AllChats />
        </Container>
      </main>
    </>
  );
}

export default App;
