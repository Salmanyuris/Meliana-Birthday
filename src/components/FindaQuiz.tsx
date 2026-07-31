import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const FindaQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Kapan tanggal kelahiran sahabat terbaik kita, Finda Meliana Putri?",
      options: [
        "11 September 2003 🌸",
        "1 Januari 2000 🎆",
        "17 Agustus 1999 🇮🇩",
        "25 Desember 2005 🎄"
      ],
      correctIndex: 0,
      explanation: "Tepat sekali! Finda Meliana Putri lahir pada 11 September 2003. Hari teristimewa yang selalu dirayakan dengan penuh cinta!"
    },
    {
      id: 2,
      question: "Apa kado terindah yang paling membuat Finda tersenyum bahagia hari ini?",
      options: [
        "Kehadiran, doa tulus, & momen hangat bersama orang tersayang 💖",
        "Kue ulang tahun rasa cabe rawit 🌶️",
        "Koleksi kembang api raksasa 🎆",
        "Buku catatan seratus lembar 📚"
      ],
      correctIndex: 0,
      explanation: "Benar! Bagi Finda, kasih sayang dan perhatian tulus dari keluarga & sahabat terbaik adalah kado manis tak ternilai."
    },
    {
      id: 3,
      question: "Bagaimana cara terbaik menghibur Finda saat sedang merasa lelah?",
      options: [
        "Disuruh lari maraton 10 km 🏃‍♀️",
        "Diajak obrol santai, dengerin cerita, & menikmati dessert favorit 🍰",
        "Dikasih ujian matematika 50 nomor 📐",
        "Ditinggal sendirian di tempat sepi 🤐"
      ],
      correctIndex: 1,
      explanation: "Tepat! Obrolan hangat, makanan enak, dan kehadiran sahabat selalu sukses mengembalikan senyum ceria Finda!"
    },
    {
      id: 4,
      question: "Apa keahlian tersembunyi yang membuat Finda begitu disukai sahabatnya?",
      options: [
        "Bisa terbang ke awan ☁️",
        "Aura keceriaan dan kebaikan hati yang selalu menenangkan ✨",
        "Bisa membaca pikiran orang asing 🔮",
        "Menghilang saat dipanggil 👻"
      ],
      correctIndex: 1,
      explanation: "Super power Finda adalah kebaikan hati dan senyuman manisnya yang tak pernah gagal membawa rasa hangat!"
    },
    {
      id: 5,
      question: "Apa doa utama kita untuk Finda Meliana Putri di usia terbarunya?",
      options: [
        "Sehat selalu, bahagia lahir batin, & seluruh impian indah terwujud 🌸",
        "Mendapat tiket gratis ke planet Mars 🚀",
        "Bisa tidur 24 jam nonstop tanpa bangun 😴",
        "Menjadi juara dunia petak kumpet 🙈"
      ],
      correctIndex: 0,
      explanation: "100% Benar! Semoga keberkahan, kemudahan, dan kebahagiaan sejati menyertai setiap langkah perjalanan Finda!"
    }
  ];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = idx === questions[currentIdx].correctIndex;
    if (isCorrect) {
      sound.playSparkle();
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      sound.playPop();
    }
  };

  const nextQuestion = () => {
    sound.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const restartQuiz = () => {
    sound.playSparkle();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  const currentQ = questions[currentIdx];

  return (
    <section id="quiz" className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Kuis Sahabat Terbaik</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Seberapa Kenal Kamu Dengan Finda? 🎯
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Uji seberapa tahu kamu tentang <span className="font-semibold text-pink-600">Finda Meliana Putri</span> dalam kuis ulang tahun interaktif ini!
          </p>
        </div>

        {!quizFinished ? (
          /* Quiz Card */
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl space-y-6">
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Pertanyaan {currentIdx + 1} dari {questions.length}</span>
              <span className="text-pink-600 font-bold">Skor: {score}</span>
            </div>

            <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                let btnStyle = "bg-white/80 border-pink-100 text-gray-700 hover:bg-pink-50 hover:border-pink-300";
                
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "bg-green-100 border-green-300 text-green-800 font-semibold";
                  } else if (idx === selectedOpt) {
                    btnStyle = "bg-rose-100 border-rose-300 text-rose-800";
                  } else {
                    btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm md:text-base transition-all flex items-center justify-between shadow-xs ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOpt && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-pink-50 rounded-2xl border border-pink-200 text-xs md:text-sm text-pink-900 space-y-2"
              >
                <p className="font-semibold text-pink-700">💡 Fakta Manis:</p>
                <p>{currentQ.explanation}</p>
              </motion.div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Pertanyaan Selanjutnya →' : 'Lihat Sertifikat Kuis 🎉'}</span>
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Result Certificate Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 text-center space-y-6 border border-pink-200 shadow-2xl bg-white/90"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                Sertifikat Sahabat Sejati Finda Meliana Putri! 🏆
              </h3>
              <p className="text-gray-600 text-sm">
                Kamu berhasil menjawab <span className="font-bold text-pink-600">{score} dari {questions.length}</span> pertanyaan tentang Finda!
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 text-gray-700 text-sm leading-relaxed italic font-script text-xl">
              "Terima kasih sudah selalu ada dan mendoakan Finda Meliana Putri. Persahabatan kalian adalah kado paling hangat yang membuat hari ulang tahun ini begitu berharga! 💖"
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={restartQuiz}
                className="px-6 py-3 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Kuis Lagi</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
