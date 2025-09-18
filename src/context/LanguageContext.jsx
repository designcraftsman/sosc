import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();

const TRANSLATIONS = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'Qui sommes-nous',
      services: 'Nos services',
      contact: 'Contactez-nous',
      credit: 'Crédit 5/5',
      recovery: 'Recouvrement +',
      courses: 'Formations',
      discuss: 'Discutons',
    },
    navbar: {
      modal: {
        description:
          'Chez SOSC, nous sommes le partenaire de confiance pour les entreprises et les particuliers dans la gestion de leurs finances et de leurs créances.',
        contactHeading: 'Contactez-nous',
        followHeading: 'Suivez-nous',
      },
    },
    hero: {
      slides: [
        {
          title: 'La clé d’une trésorerie saine et d’un financement optimal',
          text: 'Chez SOSC, nous simplifions l’accès au financement et optimisons la gestion de vos créances. Nos services se concentrent sur l’intermédiation financière ',
          buttonText: 'Contactez-nous',
        },
        {
          title: 'Crédit 5/5',
          text: 'Accédez aux meilleures solutions de financement du marché grâce à notre réseau de partenaires financiers de premier plan.',
          buttonText: 'Contactez-nous',
        },
        {
          title: 'Recouvrement +',
          text: 'Optimisez vos processus de recouvrement grâce à nos solutions spécialisées et notre expertise éprouvée. ',
          buttonText: 'Contactez-nous',
        },
        {
          title: 'Formation en Recouvrement',
          text: "Nos formations spécialisées en recouvrement ont été conçues pour répondre aux besoins spécifiques des entreprises, des professionnels et du marché de l'emploi.",
          buttonText: 'Contactez-nous',
        },
      ],
    },
    pages: {
      services: {
        headerTitle: 'Nos Services',
        headerText: 'Découvrez nos services et comment nous pouvons vous aider à atteindre vos objectifs',
      },
      about: {
        headerTitle: 'À Propos de Nous',
        headerText: 'Chez SOSC, nous sommes le partenaire de confiance pour les entreprises et les particuliers dans la gestion de leurs finances et de leurs créances.',
      },
      courses: {
        headerTitle: 'Nos Formations',
        headerText: '',
      },
      loan: {
        headerTitle: 'Crédit 5/5',
        headerText: '',
      },
      recovery: {
        headerTitle: 'Recouvrement +',
        headerText: '',
      },
      contact: {
        headerTitle: 'Vous avez des questions ? ',
        headerText:
          'Vos commentaires et vos questions sont importants pour nous et nous avons hâte de vous rencontrer.',
      },
    },
    servicesSection: {
      title: 'Nos Services',
      subtitle: 'Quels services proposons-nous à nos clients ?',
      cards: {
        credit: {
          title: 'Crédit 5/5',
          text: 'Des solutions de financement sur mesure pour particuliers et entreprises',
        },
        recovery: {
          title: 'Recouvrement +',
          text: 'Optimisez vos processus de recouvrement grâce à nos solutions spécialisées et notre expertise éprouvée.',
        },
        courses: {
          title: 'Formations',
          text: 'Nos programmes vous offrent des compétences opérationnelles et stratégiques indispensables.',
        },
      },
    },
    aboutSection: {
      title: 'À propos de nous',
      subtitle: 'Nous sommes la meilleure agence pour améliorer vos transactions.',
      paragraph:
        'Chez SOSC, nous sommes le partenaire de confiance pour les entreprises et les particuliers dans la gestion de leurs finances et de leurs créances.\nNous mettons à votre disposition des services de financement adaptés, des solutions efficaces de recouvrement de créances, et des formations spécialisées pour vous permettre de naviguer sereinement dans l’univers financier.',
      more: 'En Savoir Plus',
    },
    contactSection: {
      title: 'Contactez-nous',
      subtitle:
        'Contactez-nous à tout moment via notre formulaire de contact, par e-mail ou par téléphone, nous vous répondrons dans les plus brefs délais.',
      placeholders: {
        name: 'Nom',
        email: 'Email',
        subject: 'Objet',
        message: 'Votre message',
      },
      submit: 'Soumettre',
    },
    mission: {
      title: 'Notre mission',
      subtitle: 'Nous sommes des cabinets de conseil aux entreprises primés.',
      paragraph:
        'Aider les entreprises et les particuliers à gérer et optimiser leur santé financière en offrant des solutions de recouvrement efficaces, des financements adaptés et des formations spécialisées pour prendre des décisions financières éclairées. Nous vous accompagnons pour sécuriser vos créances, accéder aux meilleures options de crédit et développer des compétences clés pour une gestion optimale de vos finances. Grâce à nos partenariats solides et notre expertise, nous transformons les défis financiers en opportunités de croissance durable.',
    },
    cta: {
      heading: 'Discutons de la manière dont nous pouvons contribuer à améliorer votre entreprise.',
      button: 'Contactez-nous',
    },
    whyChooseUs: {
      title: 'Pourquoi nous choisir ?',
      bullets: [
        'Une expertise reconnue dans le domaine du Crédit et du Recouvrement',
        'Une approche sur mesure adaptée à vos besoins',
        'Un engagement à long terme pour des solutions efficaces et stratégiques',
      ],
    },
    whyChooseLoan: {
      title: 'Pourquoi choisir SOSC pour votre intermédiation financière ?',
      bullets: [
        'Expertise reconnue dans le secteur financier marocain',
        'Accès privilégié à des solutions de financement adaptées et compétitives.',
        'Accompagnement personnalisé pour garantir le succès de vos demandes de financement.',
        'Réduction des démarches administratives grâce à notre réseau de partenaires.',
      ],
    },
    loan: {
      partnerTitle:
        'Votre partenaire de confiance pour accéder aux meilleures offres de crédit au Maroc.',
      partnerText:
        'Chez SOSC, nous sommes votre partenaire stratégique dans la recherche et l’obtention de financements adaptés. Grâce à nos partenariats solides avec les institutions financières de premier plan, nous vous proposons des solutions de crédit exclusives, sur mesure et compétitives, que vous soyez un particulier ou une entreprise. Nous gérons chaque étape du processus de financement, de l’étude de vos besoins à l’obtention du financement, pour vous assurer les meilleures conditions possibles.',
    },
    financialPartners: {
      title: 'Nos partenaires financiers',
      text:
        "Grâce à nos partenariats stratégiques avec des institutions financières de renom, nous vous offrons l'accès aux meilleures offres de crédit du marché. Nos partenaires sont sélectionnés avec soin pour leur expertise, leur fiabilité et leur capacité à répondre à vos besoins financiers",
    },
    recoveryPartner: {
      title: 'Des Solutions Efficaces Pour La Gestion de Vos Créances',
      paragraph:
        'Optimisez votre trésorerie avec des solutions de recouvrement sur mesure\n\nEn conformité avec le Code étique du recouvrement pré-judicaire des créances de BANK AL-MAGHRIB, nos services de recouvrement externalisé couvrent l’ensemble des étapes essentielles pour garantir un suivi efficace et une récupération rapide de vos créances. Nous mettons en œuvre des méthodes éprouvées qui assurent un taux de recouvrement élevé tout en préservant vos relations commerciales.\n\nDécouvrez comment nous transformons la gestion de vos créances en un levier de performance.',
    },
    debtRecovery: {
      sectionTitle: 'Nos services de recouvrement',
      items: [
        {
          title: 'Analyse des créances en souffrance',
          text:
            'Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.',
        },
        {
          title: 'Cadrage',
          text:
            'Définition des priorités, objectifs et plan d’action pour structurer les opérations de recouvrement.',
        },
        {
          title: 'Relance amiable',
          text:
            'Mise en place d’un suivi structuré pour rappeler vos débiteurs, prévenir les retards et éviter l’escalade des conflits.',
        },
        {
          title: 'Négociation de règlement',
          text:
            'Nous facilitons les négociations pour obtenir des paiements partiels ou des échéanciers adaptés.',
        },
        {
          title: 'Suivi personnalisé',
          text:
            'Un suivi transparent et constant pour vous tenir informé de l’avancement du recouvrement et des actions entreprises.',
        },
      ],
    },
    coursesIntro: {
      heading: 'Développez l’expertise qui fait la différence en recouvrement !',
      p1:
        'Nos formations spécialisées en recouvrement ont été conçues pour répondre aux besoins spécifiques des entreprises, des professionnels et du marché de l’emploi. Nos programmes vous offrent des compétences opérationnelles et stratégiques indispensables.',
      p2:
        'Grâce à des modules pratiques et à l’expertise de nos formateurs reconnus dans le domaine, vous apprendrez à gérer efficacement toutes les étapes du recouvrement, à établir des stratégies adaptées et à utiliser des outils performants de suivi et de reporting.',
      p3: 'Avec SOSC, formez-vous pour anticiper les défis du recouvrement et améliorer vos résultats !',
    },
    coursesList: {
      items: [
        {
          id: 'base-recouvrement',
          title: 'Formation de base en recouvrement',
          description:
            'Apprenez les fondamentaux du recouvrement amiable, la gestion des créances et la relation client.',
          level: 'Débutant',
          hours: '20',
        },
        {
          id: 'techniques-avancees',
          title: 'Techniques avancées de recouvrement',
          description:
            'Approfondissez les techniques de recouvrement pour maximiser l’efficacité et les résultats.',
          level: 'Intermédiaire',
          hours: '30',
        },
      ],
    },
    courseDetails: {
      titleMap: {
        'base-recouvrement': 'Formation de base en recouvrement',
        'techniques-avancees': 'Techniques avancées de recouvrement',
      },
      labels: {
        description: 'Description',
        audience: 'Ce cours est destiné aux',
        learn: 'Ce que vous allez apprendre',
        content: 'Contenu de la formation',
      },
      levelBeginner: 'Débutant',
      hoursUnit: 'heures',
      learnPoints: [
        'Comprendre les fondamentaux du recouvrement amiable et ses étapes clés.',
        'Maîtriser les techniques de relance (automatique, manuelle, mise en demeure).',
        'Développer une communication claire et efficace avec les débiteurs.',
      ],
      audience: [
        'Novices souhaitant acquérir des compétences en recouvrement',
        'Étudiants : Bac+2 en droit, économie, gestion, ou lauréats de l’OFPPT.',
        'Entreprises débutant la gestion du recouvrement en interne.',
      ],
      content: [
        'Introduction au recouvrement : objectifs et étapes clés.',
        'Les bonnes pratiques de relance amiable. – Comment communiquer efficacement avec les débiteurs.',
        'Escalade de communication.',
        'Relance Automatique, Manuelle et mise en demeure.',
        'La gestion des objections et des conflits.',
        'La gestion préventive du stress.',
        'Introduction à l’utilisation des outils de suivi.',
      ],
    },
    loanPacks: {
      title: 'Découvrez Nos Packs',
      items: [
        { text: 'Conçu pour les Fonctionnaires, ce pack vous aide à réaliser vos projets personnels.' },
        { text: 'Destiné aux entrepreneurs, ce pack soutient vos ambitions commerciales.' },
        { text: 'Pour les jeunes diplômés, ce pack facilite votre insertion professionnelle.' },
        { text: 'Adapté aux retraités, ce pack sécurise votre avenir financier.' },
        { text: 'Conçu pour les familles, ce pack réalise vos rêves immobiliers.' },
        { text: 'Pour les étudiants, ce pack finance votre éducation et formation.' },
      ],
    },
    teamSection: {
      title: 'Notre équipe',
      subtitle: 'Rencontrez notre équipe talentueuse',
      roles: [
        'Coaching en Soft Skills',
        'Dr en Droit Privé',
        'Associé et Directeur Commercial Exécutif',
      ],
    },
    common: {
      learnMore: 'En savoir plus',
      submit: 'Soumettre',
      name: 'Nom',
      email: 'Email',
      subject: 'Objet',
      message: 'Votre message',
      hours: 'heures',
    },
    footer: {
      followUs: 'Retrouvez-nous sur les réseaux sociaux',
      company: 'Entreprise',
      about: 'À propos de nous',
      services: 'Nos services',
      team: 'Notre équipe',
      contact: 'Contact',
      privacy: 'Politique de confidentialité',
      terms: "Conditions d'utilisation",
      rights: 'Tous droits réservés.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      contact: 'اتصل بنا',
      credit: 'قرض 5/5',
      recovery: 'التحصيل +',
      courses: 'تكوينات',
      discuss: 'لنتحدث',
    },
    navbar: {
      modal: {
        description:
          'في SOSC نحن الشريك الموثوق للشركات والأفراد في إدارة شؤونهم المالية ومطالباتهم.',
        contactHeading: 'اتصل بنا',
        followHeading: 'تابعونا',
      },
    },
    hero: {
      slides: [
        {
          title: 'مفتاح خزينة صحية وتمويل أمثل',
          text: 'في SOSC، نبسّط الوصول إلى التمويل ونحسّن إدارة مطالباتكم. تتركّز خدماتنا على الوساطة المالية.',
          buttonText: 'اتصل بنا',
        },
        {
          title: 'قرض 5/5',
          text: 'استفد من أفضل حلول التمويل في السوق عبر شبكة شركائنا الماليين من الدرجة الأولى.',
          buttonText: 'اتصل بنا',
        },
        {
          title: 'التحصيل +',
          text: 'حسّن عمليات التحصيل لديك بفضل حلولنا المتخصصة وخبرتنا المُثبتة.',
          buttonText: 'اتصل بنا',
        },
        {
          title: 'تكوين في التحصيل',
          text: 'تم تصميم تكويناتنا المتخصصة في التحصيل لتلبية احتياجات الشركات والمهنيين وسوق الشغل.',
          buttonText: 'اتصل بنا',
        },
      ],
    },
    pages: {
      services: {
        headerTitle: 'خدماتنا',
        headerText: 'اكتشف خدماتنا وكيف نساعدك على تحقيق أهدافك',
      },
      about: {
        headerTitle: 'من نحن',
        headerText: 'في SOSC نحن الشريك الموثوق للشركات والأفراد في إدارة شؤونهم المالية ومطالباتهم.',
      },
      courses: {
        headerTitle: 'تكويناتنا',
        headerText: '',
      },
      loan: {
        headerTitle: 'قرض 5/5',
        headerText: '',
      },
      recovery: {
        headerTitle: 'التحصيل +',
        headerText: '',
      },
      contact: {
        headerTitle: 'هل لديكم أسئلة؟',
        headerText: 'ملاحظاتكم وأسئلتكم تهمنا ونتطلع للتواصل معكم.',
      },
    },
    servicesSection: {
      title: 'خدماتنا',
      subtitle: 'ما هي الخدمات التي نقدمها لعملائنا؟',
      cards: {
        credit: {
          title: 'قرض 5/5',
          text: 'حلول تمويل مخصصة للأفراد والشركات',
        },
        recovery: {
          title: 'التحصيل +',
          text: 'حسّن عمليات التحصيل لديك بحلول متخصصة وخبرة مُثبتة.',
        },
        courses: {
          title: 'تكوينات',
          text: 'برامجنا تمنحك مهارات تشغيلية واستراتيجية أساسية.',
        },
      },
    },
    aboutSection: {
      title: 'من نحن',
      subtitle: 'نحن أفضل وكالة لتحسين معاملاتكم.',
      paragraph:
        'في SOSC نحن الشريك الموثوق للشركات والأفراد في إدارة شؤونهم المالية ومطالباتهم.\nنوفر لكم خدمات تمويل مناسبة، وحلولاً فعّالة لتحصيل الديون، وتكوينات متخصصة لتمكينكم من التسيير بثقة في عالم المال.',
      more: 'المزيد',
    },
    contactSection: {
      title: 'اتصل بنا',
      subtitle:
        'تواصلوا معنا في أي وقت عبر نموذج الاتصال أو البريد الإلكتروني أو الهاتف، سنرد عليكم في أقرب وقت ممكن.',
      placeholders: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتكم',
      },
      submit: 'إرسال',
    },
    mission: {
      title: 'مهمتنا',
      subtitle: 'نحن مكتب استشاري حائز على جوائز.',
      paragraph:
        'نساعد الشركات والأفراد على إدارة وتحسين صحتهم المالية عبر حلول فعّالة للتحصيل وتمويلات مناسبة وتكوينات متخصصة لاتخاذ قرارات مالية مدروسة. نرافقكم لحماية مطالباتكم والوصول إلى أفضل خيارات التمويل وتطوير المهارات الأساسية لتسيير أمثل لماليتكم. بفضل شراكاتنا القوية وخبرتنا، نحوّل التحديات المالية إلى فرص نمو مستدام.',
    },
    cta: {
      heading: 'دعونا نناقش كيف يمكننا الإسهام في تطوير مؤسستكم.',
      button: 'اتصل بنا',
    },
    whyChooseUs: {
      title: 'لماذا تختاروننا؟',
      bullets: [
        'خبرة معترف بها في مجال القروض والتحصيل',
        'مقاربة مخصّصة تناسب احتياجاتكم',
        'التزام طويل الأمد بحلول فعّالة واستراتيجية',
      ],
    },
    whyChooseLoan: {
      title: 'لماذا تختارون SOSC لوساطتكم المالية؟',
      bullets: [
        'خبرة معترف بها في القطاع المالي المغربي',
        'ولوج مميز إلى حلول تمويل مناسبة وتنافسية.',
        'مواكبة شخصية لضمان نجاح طلباتكم للتمويل.',
        'تقليص الإجراءات الإدارية بفضل شبكة شركائنا.',
      ],
    },
    loan: {
      partnerTitle: 'شريككم الموثوق للوصول إلى أفضل عروض القروض في المغرب.',
      partnerText:
        'في SOSC نحن شريككم الاستراتيجي في البحث عن التمويلات المناسبة والحصول عليها. بفضل شراكاتنا القوية مع مؤسسات مالية رائدة، نوفر لكم حلول قروض حصرية ومخصصة وتنافسية سواء كنتم أفرادًا أو شركات. ندير كل مراحل عملية التمويل، من دراسة احتياجاتكم إلى الحصول على التمويل، لضمان أفضل الشروط الممكنة.',
    },
    financialPartners: {
      title: 'شركاؤنا الماليون',
      text:
        'بفضل شراكاتنا الاستراتيجية مع مؤسسات مالية مرموقة، نتيح لكم الوصول إلى أفضل عروض القروض في السوق. نختار شركاءنا بعناية لخبرتهم وموثوقيتهم وقدرتهم على تلبية احتياجاتكم المالية.',
    },
    recoveryPartner: {
      title: 'حلول فعّالة لتدبير مطالباتكم',
      paragraph:
        'حسّنوا خزينة شركتكم بحلول تحصيل مخصّصة.\n\nوفقًا لميثاق التحصيل قبل القضائي الصادر عن بنك المغرب، تغطي خدماتنا الخارجية للتحصيل جميع المراحل الأساسية لضمان متابعة فعّالة واسترجاع سريع لمطالباتكم. نعتمد أساليب مُثبتة تحقق نسبة تحصيل عالية مع الحفاظ على علاقاتكم التجارية.\n\nاكتشفوا كيف نحوّل تدبير المطالبات إلى رافعة أداء.',
    },
    debtRecovery: {
      sectionTitle: 'خدماتنا في مجال التحصيل',
      items: [
        {
          title: 'تحليل المطالبات المتعثرة',
          text:
            'تحديد المطالبات غير المؤدّاة وتقييم درجة مخاطرتها لوضع إستراتيجية ملائمة.',
        },
        {
          title: 'التأطير والتنظيم',
          text:
            'تحديد الأولويات والأهداف وخطة العمل لتنظيم عمليات التحصيل.',
        },
        {
          title: 'المتابعة الودية',
          text:
            'إرساء متابعة منظّمة لتذكير المدينين ومنع التأخير وتفادي تصعيد النزاعات.',
        },
        {
          title: 'التفاوض على التسوية',
          text: 'نسهّل المفاوضات للحصول على دفعات جزئية أو جداول سداد ملائمة.',
        },
        {
          title: 'متابعة مخصّصة',
          text:
            'متابعة شفافة ودائمة لإطلاعكم على تقدم التحصيل والإجراءات المتّخذة.',
        },
      ],
    },
    coursesIntro: {
      heading: 'طوّروا الخبرة التي تصنع الفارق في مجال التحصيل!',
      p1:
        'تم تصميم تكويناتنا المتخصصة في التحصيل لتلبية احتياجات الشركات والمهنيين وسوق الشغل. برامجنا تمنحكم مهارات تشغيلية واستراتيجية أساسية.',
      p2:
        'بفضل وحدات تطبيقية وخبرة مكوّنين معترف بهم، ستتعلّمون تدبير جميع مراحل التحصيل بكفاءة، ووضع إستراتيجيات ملائمة واستخدام أدوات فعالة للتتبع والتقارير.',
      p3: 'مع SOSC، تدرّبوا لاستباق تحديات التحصيل وتحسين النتائج!',
    },
    coursesList: {
      items: [
        {
          id: 'base-recouvrement',
          title: 'تكوين أساسي في التحصيل',
          description:
            'تعلّموا أساسيات التحصيل الودي، وتدبير المطالبات وعلاقة الزبون.',
          level: 'مبتدئ',
          hours: '20',
        },
        {
          id: 'techniques-avancees',
          title: 'تقنيات متقدمة في التحصيل',
          description:
            'عمّقوا تقنيات التحصيل لتعظيم الفعالية والنتائج.',
          level: 'متوسط',
          hours: '30',
        },
      ],
    },
    courseDetails: {
      titleMap: {
        'base-recouvrement': 'تكوين أساسي في التحصيل',
        'techniques-avancees': 'تقنيات متقدمة في التحصيل',
      },
      labels: {
        description: 'الوصف',
        audience: 'هذه الدورة موجهة إلى',
        learn: 'ستتعلّمون',
        content: 'محتوى الدورة',
      },
      levelBeginner: 'مبتدئ',
      hoursUnit: 'ساعات',
      learnPoints: [
        'فهم أساسيات التحصيل الودي ومراحله الرئيسية.',
        'إتقان تقنيات المتابعة (آلية، يدوية، إنذار رسمي).',
        'تطوير تواصل واضح وفعّال مع المدينين.',
      ],
      audience: [
        'مبتدئون يرغبون في اكتساب مهارات في التحصيل',
        'طلبة: بكالوريوس+2 في القانون أو الاقتصاد أو التسيير، أو خريجو OFPPT.',
        'شركات بدأت تدبير التحصيل داخليًا.',
      ],
      content: [
        'مقدمة في التحصيل: الأهداف والمراحل الرئيسية.',
        'أفضل ممارسات المتابعة الودية – كيف تتواصل بفعالية مع المدينين.',
        'تصعيد التواصل.',
        'المتابعة الآلية واليدوية والإنذار الرسمي.',
        'تدبير الاعتراضات والنزاعات.',
        'التدبير الوقائي للتوتر.',
        'مقدمة لاستخدام أدوات التتبع.',
      ],
    },
    loanPacks: {
      title: 'اكتشفوا باقاتنا',
      items: [
        { text: 'مخصصة للموظفين العموميين، تساعدكم على تحقيق مشاريعكم الشخصية.' },
        { text: 'موجهة لرواد الأعمال، تدعم طموحاتكم التجارية.' },
        { text: 'للخريجين الجدد، تسهّل إدماجكم المهني.' },
        { text: 'مناسبة للمتقاعدين، تضمن مستقبلكم المالي.', },
        { text: 'مخصصة للعائلات، تحقق أحلامكم العقارية.', },
        { text: 'للطلاب، تموّل تعليمكم وتكوينكم.', },
      ],
    },
    teamSection: {
      title: 'فريقنا',
      subtitle: 'تعرّفوا على فريقنا الموهوب',
      roles: [
        'تدريب على المهارات الناعمة',
        'دكتوراه في القانون الخاص',
        'شريك ومدير تجاري تنفيذي',
      ],
    },
    common: {
      learnMore: 'المزيد',
      submit: 'إرسال',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'رسالتكم',
      hours: 'ساعات',
    },
    footer: {
      followUs: 'تابعونا على شبكات التواصل الاجتماعي',
      company: 'الشركة',
      about: 'من نحن',
      services: 'خدماتنا',
      team: 'فريقنا',
      contact: 'اتصل',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('lang') || 'fr');

  // Compute direction from language
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Persist and update html attributes
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const t = useMemo(() => {
    const table = TRANSLATIONS[language] || TRANSLATIONS.fr;
    return (path) => {
      // simple dot-path resolver, e.g. 'nav.home'
      return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : path), table);
    };
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, dir, t }), [language, dir, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
