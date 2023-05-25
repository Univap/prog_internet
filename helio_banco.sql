
create table competencias_descricao(
	codigo_competencia int primary key auto_increment,
    nome_competencia varchar(50) not null,
    descricao_competencia varchar(255) not null
);
INSERT INTO competencias_descricao (nome_competencia, descricao_competencia)
VALUES 
("Comunicação", "Habilidade de se comunicar com clareza e efetividade em diferentes contextos e meios de comunicação."),
("Trabalho em equipe", "Capacidade de colaborar com colegas de trabalho para atingir objetivos comuns, compartilhando ideias e responsabilidades."),
("Liderança", "Capacidade de inspirar, motivar e guiar um grupo de pessoas para atingir objetivos e metas compartilhados."),
("Resolução de problemas", "Capacidade de identificar, analisar e resolver problemas de forma eficiente e eficaz, utilizando recursos disponíveis."),
("Adaptabilidade", "Capacidade de se adaptar a novas situações, aprender rapidamente e lidar com mudanças em ambientes dinâmicos."),
("Pensamento crítico", "Habilidade de analisar informações de forma objetiva e avaliar argumentos com base em evidências, visando chegar a conclusões fundamentadas."),
("Empatia", "Capacidade de compreender e se colocar no lugar de outras pessoas, reconhecendo suas emoções e necessidades."),
("Criatividade", "Habilidade de gerar ideias originais e inovadoras, bem como de encontrar soluções criativas para problemas complexos."),
("Organização", "Capacidade de planejar, organizar e priorizar tarefas de forma eficiente e eficaz, visando atingir objetivos e metas estabelecidos."),
("Autoconfiança", "Capacidade de confiar em si mesmo, em suas habilidades e em suas decisões, bem como de lidar com críticas e feedbacks construtivos.");
