import NotesCard from '../components/NotesCard';
import useStore from '../context/UseStore';

function DisplayNotes() {
  const { notesData } = useStore();

  if (!notesData || notesData.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No notes available
      </div>
    );
  }

  return (
    <div className='w-full h-full'>
    <h1 className='text-white pl-[10%] mt-20 text-5xl first-letter:text-[150%]'>Notes uplaoded by <br /> <span className='text-[#27E0B3]'>students</span></h1>
    <div className="max-w-6xl pl-[10%] mt-10 p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notesData.map((eachNote) => (
        <NotesCard
          key={eachNote._id}
          id={eachNote._id}
          title={eachNote.title}
          likes={eachNote.likes}
          notes={eachNote.notes}
          uploadedBy={eachNote.uploadedBy}
          createdAt={eachNote.createdAt}
          pdf={eachNote.pdf}
        />
      ))}
    </div>
    </div>
  );
}

export default DisplayNotes;
