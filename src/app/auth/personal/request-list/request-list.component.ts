import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})
export class RequestListComponent {
  mockCompanies: Company[] = [
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      job: 'Software Development',
      description:
        'Develop and maintain enterprise-level software solutions for various clients, ensuring scalability and efficiency.',
      logoUrl:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-art-design-logo-png-template-484a974e99203f809abdc7dfeeeb2816_screen.jpg?ts=1645947909',
    },
    {
      id: 2,
      name: 'Innovate Consulting',
      job: 'Business Strategy',
      description:
        'Analyze market trends and develop strategic plans to help businesses improve their operations and increase profitability.',
      logoUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2022/04/20/NFT-Logo-Metaverse-Modern-Logo-Graphics-29305498-1-580x435.jpg',
    },
    {
      id: 3,
      name: 'Creative Minds Studio',
      job: 'Graphic Design',
      description:
        'Create visually compelling designs for branding, marketing materials, and digital media, ensuring brand consistency across all platforms.',
      logoUrl:
        'https://media.istockphoto.com/id/1331491686/es/vector/dise%C3%B1o-de-elementos.jpg?s=612x612&w=0&k=20&c=zmg79X_NSr0bbyKPO987o2hPg7pYML1g5dpHOuT_1Cs=',
    },
    {
      id: 4,
      name: 'Green Energy Corp.',
      job: 'Sustainable Energy Solutions',
      description:
        'Develop and implement renewable energy projects, focusing on solar and wind power, to promote sustainability and reduce carbon footprints.',
      logoUrl:
        'https://www.zarla.com/images/zarla-acierto-1x1-2400x2400-20220119-vtgt9dcpcwgx896kq9mt.png?crop=1:1,smart&width=250&dpr=2',
    },
    {
      id: 5,
      name: 'HealthFirst Medical',
      job: 'Healthcare Consulting',
      description:
        'Provide expert advice on healthcare management, including process improvement, regulatory compliance, and patient care strategies.',
      logoUrl:
        'https://eserrano.com/wp-content/images/custom-chocolate-logo.png',
    },
    {
      id: 6,
      name: 'Finance Pro Advisors',
      job: 'Financial Planning',
      description:
        'Offer personalized financial planning services, including investment advice, retirement planning, and risk management.',
      logoUrl:
        'https://www.adobe.com/es/express/create/logo/media_1b45a0184484ef856334e010afb5765ca6d717915.png?width=750&format=png&optimize=medium',
    },
    {
      id: 7,
      name: 'Marketing Gurus',
      job: 'Digital Marketing',
      description:
        'Design and execute digital marketing campaigns, focusing on SEO, content marketing, and social media strategies to drive brand awareness and engagement.',
      logoUrl:
        'https://www.zarla.com/images/zarla-soluciona-1x1-2400x2400-20210603-kbcydrbb8dkqmkpff743.png?crop=1:1,smart&width=250&dpr=2',
    },
    {
      id: 8,
      name: 'EduSmart',
      job: 'E-Learning Solutions',
      description:
        'Develop e-learning platforms and educational content to facilitate online learning and training for various industries.',
      logoUrl:
        'https://img.freepik.com/vector-gratis/plantilla-logotipo-amigos_23-2149505594.jpg',
    },
  ];

  navigateToDetail(id: number) {
    console.log('Navigating to detail page', id);
  }
}

interface Company {
  id: number;
  name: string;
  job: string;
  description: string;
  logoUrl: string;
}
