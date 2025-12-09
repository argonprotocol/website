<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/four-pillars">The Four Pillars of Argon</RouterLink>
    </Breadcrumbs>
    <SubTitle>Indifferent to Catastrophe</SubTitle>

    <SubContent class="space-y-4">
      <div class="font-extralight italic text-4xl leading-12 my-10 mr-28">
        A well-designed currency should exist independent of worldly affairs, fully decoupled from
        any single nation state, banking institution, or other fallible entity.
      </div>
      <p>
        For thousands of years, the world has used gold. Gold has largely been indifferent to geographical and
        geopolitical catestrophe, and it doesn't care which government was in power. If your coins were
        stamped with the old regime, you could melt them down and stamp them with the new regime. They
        retained their value across generational time and space. A bar of gold was worth a bar of gold, 
        regardless of which century or country you landed in.
      </p>

      <p>
        Money no longer has gold's eternal property. Largely due to the challenges of transmissing gold
        across long distances, fiat emerged as the world's dominant currency, and with it, a new risk. The value
        of fiat currency is entirely dependent on the issuing government retaining their power and staying 
        fiscally healthy. When the government fails, so does the currency. Every time.
      </p>

      <p>
        As history has shown, given enough time, all centralized entities fail. No
        nation lasts forever. It could be war, unsustainable spending, natural disasters, or simply 
        because a government loses popular support. Regardless, the outcome is the same: the currency becomes worthless.
      </p>

      <p>
        Over the last decade, a new challenge has emerged. The rise of the digital economy has created a need for digital
        money. Stablecoins have emerged as the solution, but they compound fiat's risk. The dollar is only
        dependent on one entity for survival: The United States of America. However, a stablecoin, such as USDC, requires
        three entities for survival: the fiat it's pegged to, the company issuing the token, and the
        custodians holding the assets behind it. If any one of these three entities fail, the stablecoin becomes worthless.
      </p>

      <div class="flex flex-row space-x-10 mt-10 mb-3">
        <section box class="border-6 border-red-600 bg-white shadow text-center">
          <h3 class="text-2xl font-bold py-3">Fiat Currencies</h3>
          <emphasis class="block border-t border-b border-gray-200 mx-5 py-2 text-lg italic text-red-600 font-bold">1 Critical Dependency</emphasis>
          <div class="py-5 px-[10%]">Survival depends on the nation's independent existence and continued financial health.</div>
        </section>
        <section box class="border-6 border-red-600 bg-white shadow text-center">
          <h3 class="text-2xl font-bold py-3">Traditional Stablecoins</h3>
          <emphasis class="block border-t border-b border-gray-200 mx-5 py-2 text-lg italic text-red-600 font-bold">3 Critical Dependencies</emphasis>
          <div class="py-5 px-[10%]">Survival depends on the the fiat its pegged to, the issuer of the token, and the asset custodians.</div>
        </section>
      </div>

      <div class="relative -mb-10 z-[-1]">
        <WorldMap style="width: 100%;" />
        <section box class="absolute bottom-20 left-0 right-0 border-6 border-lime-600 bg-white shadow text-center">
          <h3 class="text-2xl font-bold py-3">Gold, Bitcoin, & Argon</h3>
          <emphasis class="block border-t border-b border-gray-200 mx-5 py-2 text-lg italic text-lime-600 font-bold">0 Critical Dependencies</emphasis>
          <div class="py-5">All three are agnostic to geographic, geopolitical and entity upheavals.</div>
        </section>
      </div>

      <p>
        Gold, Bitcoin and Argon have few (if any) dependencies on geographical or geopolitical issues, nor is their
        survival dependant on the world's banking network continuing. To say it another way, they are decoupled from 
        the world's problems.
      </p>

      <p>
        To use crypto terminology, Argon is fully decentralized, but its definition of decentralization goes far beyond 
        that of a simple blockchain. Argon's entire value stack &ndash; from top to bottom &ndash; never touches the 
        confines of physical geography or institutional structure. 
      </p>

      <h3 class="text-2xl font-bold mt-14">
        It's Not Doom But Indifference That Matters
      </h3>

      <p>
        To be clear, the monetary principle of Indifference isn't drivin by a belief that catastrophe is coming.
        Instead, it's that, given the choice, a currency should be indifferent to the future. Like gold, the ideal
        currency should be able to survive the bounds of time and space. You should be able to convert goods and
        services into a currency with the assurance that it can hold its value. 
      </p>

      <p>
        The following tables dissect several important currencies based on their ability to withstand geographical and geopolitical 
        disasters.
      </p>

      <h3 class="text-2xl font-bold mt-14">
        Dissecting The Bitcoin Stack
      </h3>
      <p>
        Many crypto projects market themselves as decentralized. Bitcoin is one of the few that truly is, and for this reason, it
        is the store-of-value behind Argon.
      </p>

      <table class="mt-10">
        <thead>
          <tr>
            <th></th>
            <th><div class="w-[225px]"></div></th>
            <th class="px-5 pb-2 whitespace-nowrap opacity-50 leading-6">Catastrope<br />Resilience?</th>
            <th class="w-full"></th>
          </tr>
        </thead>
        <tbody>
          <tr success>
            <td number>
              <div wrapper>
                1
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Usage</div>
                <div>
                  <BitcoinIcon class="w-10 h-10 inline-block" />
                  =
                  <ShoppingIcon class="w-10 h-10 inline-block" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes>
              <div wrapper>
                Yes
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                Thousands of exchanges, wallets, merchants, and individuals transact in Bitcoin across every continent. Usage is 
                spread across countless independent actors, and there are no gatekeepers. No single platform, company, or country 
                can shut down global payments.  Although it's possible to imagine a world
                where governments make using bitcoin difficult, it's hard to imagine a world where using it
                becomes impossible. Even if entire regions go offline, Bitcoin transactions continue elsewhere. 
                This naturally leads into the question of how Bitcoin's value is set across so many participants.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number>
              <div wrapper>
                2
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Valuation</div>
                <div>
                  <PriceIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes>
              <div wrapper>
                Yes
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                Bitcoin has no single “valuation authority.” Price discovery happens simultaneously across many venues worldwide 
                (spot exchanges, OTC desks, P2P markets, derivatives). Multiple venues prevent a single point of failure. If one 
                market collapses or is manipulated, others remain to anchor price. If a top exchange is compromised or a country bans 
                trading, global price discovery persists elsewhere with minimal long-term disruption. However, one of the key
                determining factors of Bitcoin's price is the amount of new bitcoin that can be mined, which is determined by
                its algorithm, not a centralized group of bankers.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number>
              <div wrapper>
                3
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Algorithm</div>
                <div>
                  <CodeIcon class="w-10 inline-block opacity-80" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes>
              <div wrapper>
                Yes
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                Bitcoin's mining rules cap the number of tokens to be created at 21 million. These rules are expressed in
                open-source software that anyone can implement. Developers around the world contribute clients that encode the 
                same rules, and anyone is free to write their own implementation. This diversity of software ensures there is 
                no single chokepoint. If one implementation is compromised or abandoned, others remain, and the rules survive. 
                It is the miners who decide which implementation to run.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number><div wrapper>4</div></td>
            <td component>
              <div wrapper>
                <div label>Mining</div>
                <div>
                  <MinerIcon class="w-16 inline-block opacity-90" />
                </div>
              </div>
            </td>
            <td centralized Yes>
              <div wrapper>
                Yes
              </div>
            </td>
            <td description>
              <div wrapper>
                Anyone with hardware and electricity can join Bitcoin as a miner. Operators are free to choose which 
                implementation of the rules they will run, creating alignment between code and consensus. Mining is 
                distributed across independent operators in multiple jurisdictions, with diverse energy sources and equipment.
                If miners in one country are shut down, the hashrate drops temporarily but the network continues. Difficulty 
                adjusts to re-balance, ensuring blocks are still produced. This freedom of entry and diversity of participation 
                prevent block production from being permenantly monopolized.
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Bitcoin's resilience is virtually indestructible. Each layer is populated by many 
        independent players. Redundancy across jurisdictions and organizations eliminates single points of failure. Localized
        collapse might degrade convenience, but it can't destroy the currency's existence.
      </p>

      <h3 class="text-2xl font-bold mt-14">
        Dissecting The U.S. Dollar Stack
      </h3>

      <p>
        Most of us have grown up with the U.S. dollar as the world's reserve currency. We've never known
        another world, and as such, it seems like an eternal currency. We rarely think of its extermination
        risk, but it exists.
      </p>

      <table class="mt-10">
        <thead>
          <tr>
            <th></th>
            <th><div class="w-[225px]"></div></th>
            <th class="px-5 pb-2 whitespace-nowrap opacity-50 leading-6">Catastrope<br />Resilience?</th>
            <th class="w-full"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td number>
              <div wrapper>
                1
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Usage</div>
                <div>
                  <DollarIcon class="h-8 inline-block opacity-90" />
                  <span class="font-bold pl-1"> =</span>
                  <ShoppingIcon class="h-10 inline-block" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized>
              <div wrapper>
                Partial
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                The U.S. dollar's usage is highly decentralized. As the most widely used currency in the world, millions 
                of businesses and individuals transact with it every day, including banks, payment networks and governments.
                There is no central gatekeeper that authorizes who can pay with it. However, the reality is that no one will
                use the dollar if it has no value, so how is the dollar's value determined and maintained?
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>
                2
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Valuation</div>
                <div>
                  <PriceIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>
                No
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                The value of the dollar is determined by government decree and supported by its role as the global reserve currency. 
                While markets affect exchange rates, the underlying authority rests with the partnership between the U.S. government 
                and its banking system. Confidence in this alliance is critical &ndash; if it falters, the dollar's valuation can collapse 
                everywhere simultaneously. This risk is deeply tied to the actions of the Federal Reserve.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>
                3
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Federal Reserve</div>
                <div>
                  <FedIcon class="w-12 inline-block opacity-80" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>
                No
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                The Federal Reserve is a hybrid institution, a partnership between the banking sector and the U.S. government. It does 
                not directly print physical dollars &ndash; that function belongs to the U.S. Treasury &ndash; but it does control monetary policy, 
                the issuance of reserves, and the management of the banking system's liquidity. Its decisions on interest rates, 
                balance sheet operations, and financial stability shape the dollar's future. Because there is only one central bank 
                in this arrangement, the entire system depends on the continued function and credibility of this institution. Its 
                policies interact closely with those of the broader government, which also enforces demand for the dollar.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>
                4
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Government</div>
                <div>
                  <CongressIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>
                No
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                The U.S. government enforces the dollar's role as the unit of account for taxes and legal tender for debts. The IRS 
                requires all taxes to be paid in dollars, which forces domestic demand for the currency. Internationally, the 
                government has used policy to entrench the dollar's dominance, from the Bretton Woods system to the 1970s bilateral 
                agreement that set oil prices in dollars. Congressional fiscal policy &ndash; through spending, debt issuance, and deficits
                &ndash; also directly affects the currency's stability. If the government mismanages these levers or loses legitimacy, 
                the dollar faces immediate existential risk. This political and economic foundation is then backed by U.S. military strength.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number><div wrapper>5</div></td>
            <td component>
              <div wrapper>
                <div label>Military</div>
                <div>
                  <MilitaryIcon class="w-16 inline-block opacity-80" />
                </div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>
                No
              </div>
            </td>
            <td description>
              <div wrapper>
                The U.S. military enforces the geopolitical dominance of the dollar, ensuring it remains the world's reserve currency. 
                Military strength helps maintain global demand for the dollar in trade and finance. A major defeat, such as losing a 
                war to a rival like China, could rapidly diminish U.S. influence and erode confidence in the dollar's supremacy. If 
                U.S. military power were to significantly decline, the dollar's status as the world's dominant currency could quickly 
                unravel. This reliance on force and centralized institutions highlights the dollar's fragility compared to decentralized 
                alternatives.
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        In summary, the dollar is highly resilient to localized failures, but it is not immune to systemic collapse. 
        Most of the layers are concentrated in a single institution: one central bank, one federal government,
        and one military. This concentration creates single points of failure.
      </p>

      <h3 class="text-2xl font-bold mt-14">
        Dissecting The USDC Stack
      </h3>

      <p>
        Fiat-backed stablecoins, such as USDC, create an interesting risk/reward tension. They carry all the risks of the dollar while
        layering even more risk. However, their returns are capped at parity with the dollar.
      </p>

      <table class="mt-10">
        <thead>
          <tr>
            <th></th>
            <th><div class="w-[225px]"></div></th>
            <th class="px-5 pb-2 whitespace-nowrap opacity-50 leading-6">Catastrope<br />Resiliant?</th>
            <th class="w-full"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td number>
              <div wrapper>
                1
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Usage</div>
                <div>
                  <USDCIcon class="h-12 inline-block opacity-90" />
                  <span class="font-bold pl-1"> =</span>
                  <ShoppingIcon class="h-10 inline-block" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized>
              <div wrapper>
                Partial
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                USDC is widely used within cryptocurrency exchanges and DeFi applications. Similar to the dollar, there are
                no gatekeepers controlling who can trade and use USDC within the various crypto networks. However, similar
                to the dollar, no one will use USDC if it has no value, so how is USDC's value determined and maintained?
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>2
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Valuation</div>
                <div>
                  <PriceIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>No
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                USDC is pegged 1:1 to the U.S. dollar. Unlike Bitcoin, which relies on global markets, USDC's valuation is 
                entirely dependent on it being directly backed by the dollar. If the market loses confidence in being able
                to exchange it for a dollar, or if the dollar itself falters, USDC falls with it. This dependence 
                points directly to the company managing its reserves, which is Circle.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>3
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Circle</div>
                <div>
                  <CircleLogo class="w-12 inline-block opacity-80" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>No
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                Circle, a single company, manages the reserves that back USDC. It is responsible for safeguarding 
                and investing the assets that guarantee each token's value. Because all reserve management is 
                concentrated in this one entity, any failure at Circle &ndash; whether from mismanagement, insider 
                fraud, or regulatory action &ndash; directly threatens USDC's credibility. Those reserves are, in turn, held by 
                specific banks and custodians. If any of these institutions collapse or withdraw support, the circulating tokens 
                lose their backing.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>4
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Banks / Custodians</div>
                <div>
                  <FedIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized No>
              <div wrapper>
                No
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td description>
              <div wrapper>
                The backing for USDC sits in the accounts of partner banks and custodians. Because these institutions 
                are centralized and regulated, tokens can be frozen or seized at the direction of authorities. If a 
                bank partner collapses, it could bring down the entire system. This almost happened during the Silicon 
                Valley Bank collapse of 2023. Custodial dependence ultimately ties USDC's viability to the U.S. dollar.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr failure>
            <td number>
              <div wrapper>5</div>
            </td>
            <td component>
              <div wrapper>
                <div label>U.S. Dollar</div>
                <div>
                  <DollarIcon class="w-16 inline-block opacity-80" />
                </div>
              </div>
            </td>
            <td centralized No><div wrapper>No</div></td>
            <td description>
              <div wrapper>
                At the bottom of the stack lies the U.S. dollar. USDC cannot outlast the fiat it is pegged to. If the 
                U.S. dollar collapses due to institutional, fiscal, or geopolitical crises, USDC vanishes alongside it. 
                This reliance on a single underlying currency exposes USDC to all of the same single points of failure.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        In most other contexts, a financial product adding additional risk would also add additional yield.
        However, the GENIUS Act prohibits these dollar-backed stablecoins from doing so. As these stablecoins 
        grow in size their risk/reward disparity will also grow. It seems likely that at some point these stablecoins
        will simply be assimilated into the dollar as a federally managed Central Bank Digital Currency (CBDC).
      </p>

      <h3 class="text-2xl font-bold mt-14">
        Dissecting The Argon Stack
      </h3>

      <p>
        Similar to Bitcoin, Argon is built on a stack of decentralized layers with no central entities or single points of failure.
      </p>

      <table class="mt-10">
        <thead>
          <tr>
            <th></th>
            <th><div class="w-[225px]"></div></th>
            <th class="px-5 pb-2 whitespace-nowrap opacity-50 leading-6">Catastrope<br />Resiliant?</th>
            <th class="w-full"></th>
          </tr>
        </thead>
        <tbody>
          <tr success>
            <td number>
              <div wrapper>1
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Usage</div>
                <div>
                  <USDCIcon class="h-12 inline-block opacity-90" />
                  <span class="font-bold pl-1"> =</span>
                  <ShoppingIcon class="h-10 inline-block" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes><div wrapper>Yes</div></td>
            <td description>
              <div wrapper>
                Argon is designed for open, peer-to-peer transactions without relying on banks or card networks. 
                Wallets, nodes, and marketplaces can be operated by anyone, enabling circulation across jurisdictions 
                and platforms. If one wallet provider, exchange, or region goes offline, others continue serving users. 
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number>
              <div wrapper>2
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Valuation</div>
                <div>
                  <PriceIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes><div wrapper>Yes</div></td>
            <td description>
              <div wrapper>
                Argon ensure stable purchasing power through external inflation indices. Although this is initially created from the
                U.S. Consumer Price Index, it is designed to be easily broadened into a global inflation basket. 
                This will allow Argon to function as a global stablecoin through on-chain oracle mechanisms that is irrespective of
                any single nation state.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number>
              <div wrapper>3
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Algorithm</div>
                <div>
                  <CodeIcon class="w-12 inline-block opacity-80" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes><div wrapper>Yes</div></td>
            <td description>
              <div wrapper>
                Similar to Bitcoin, Argon's protocol lives in open-source code that anyone can implement. Multiple clients can exist. If one implementation 
                is compromised or abandoned, new ones can be written. Each miner chooses which implementation to run.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number>
              <div wrapper>4
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td component>
              <div wrapper>
                <div label>Miners</div>
                <div>
                  <MinerIcon class="w-14 inline-block opacity-90" />
                </div>
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
            <td centralized Yes><div wrapper>Yes</div></td>
            <td description>
              <div wrapper>
                Participation is permissionless. Operators join by running the software and posting the resources 
                required (e.g., bidding for mining seats, proving work, etc). Miners freely choose which client to run, 
                aligning incentives with the consensus rules they enforce. If one jurisdiction shutters operators, 
                miners elsewhere continue; difficulty/selection adjusts and block production proceeds.
                <div Arrow><ArrowIcon /></div>
              </div>
            </td>
          </tr>
          <tr success>
            <td number><div wrapper>5</div></td>
            <td component>
              <div wrapper>
                <div label>Bitcoin</div>
                <div>
                  <BitcoinIcon class="w-16 inline-block opacity-80" />
                </div>
              </div>
            </td>
            <td centralized Yes><div wrapper>Yes</div></td>
            <td description>
              <div wrapper>
                The core of Argon's price stabilization mechanism is its endosymbiosis of Bitcoin. Anyone can setup vaults, 
                liquid lock bitcoins and provide stabilization assets for the argon network. If any vault fails, any other
                can step in; collateral can be rebalanced. Even in extreme stress, Argon's 
                architecture can reconstitute around surviving components. This layered dependence around a decentralized 
                base asset completes the stack's resistance to single points of failure.
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-2xl font-bold mt-14">
        Learn More About the Argon
      </h3>

      <p>
        Argon is build to last for a thousand years. Each layer of its stack supports a decentralized collection of independent 
        actors. This redundancy across software, geography, and entities removes any single points of failure. Localized collapse
        might degrade convenience, but it can't destroy Argon's capacity to function. For more information, check
        out Argon's other core properties:
      </p>

      <ul class="list-disc list-outside space-y-4 pl-6">
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/resistant-to-inflation" class="font-bold">Resistant to Inflation</RouterLink>
          <div class="mt-1">
            Argon allows you to build wealth without worrying about the cost of time eroding it
          </div>
        </li>
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/intrinsic-price-stabilization" class="font-bold">Intrinsic Price Stabilization</RouterLink>
          <div class="mt-1">
            Argon creates economic balance between the growth of currency and its stabilization
          </div>
        </li>
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/immune-from-death-spirals" class="font-bold">Immune from Death Spirals</RouterLink>
          <div class="mt-1">
            Argon solves the core problem inherent in previous algorithmic stablecoins.
          </div>
        </li>
      </ul>

    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
import BitcoinIcon from '../../../assets/apocalyptic/bitcoin.svg?component';
import DollarIcon from '../../../assets/apocalyptic/dollar.svg?component';
import PriceIcon from '../../../assets/apocalyptic/price.svg?component';
import ShoppingIcon from '../../../assets/apocalyptic/shopping.svg?component';
import MinerIcon from '../../../assets/apocalyptic/miner.svg?component';
import WorldMap from '../../../assets/apocalyptic/world.svg?component';
import CodeIcon from '../../../assets/apocalyptic/code.svg?component';
import FactoryIcon from '../../../assets/apocalyptic/factory.svg?component';
import FedIcon from '../../../assets/apocalyptic/fed.svg?component';
import CongressIcon from '../../../assets/apocalyptic/congress.svg?component';
import MilitaryIcon from '../../../assets/apocalyptic/military.svg?component';
import ArrowIcon from '../../../assets/apocalyptic/arrow.svg?component';
import CircleLogo from '../../../assets/apocalyptic/circle.svg?component';
import USDCIcon from '../../../assets/apocalyptic/usdc.svg?component';
</script>


<style scoped>
@import "../../../main.css";

table {
  @apply h-fit w-full text-base;

  th {
    @apply font-normal;
  }
  
  td {
    vertical-align: top;
  }

  tr div[wrapper] {
    @apply relative border-t border-black/20 h-full py-7 flex items-center w-full;

    [Arrow] {
      @apply w-5 absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-1/2 text-slate-600/40 z-10;
      &:before {
        content: '';
        @apply absolute top-0 left-0.5 right-0.5 h-full -z-10;
        background: var(--bg-color);
      }
      &:after {
        content: '';
        @apply absolute top-0 left-0 w-full h-4 z-20;
        background: linear-gradient(to bottom, var(--bg-color) 0%, transparent 100%);
      }
    }
  }
  
  tr:last-child td {
    @apply border-b border-black/20;
  }

  tr {
    @apply h-full;
  }

  tr div[wrapper] {
    &:before {
      content: '';
      @apply bg-slate-500/5;
      @apply absolute top-3 bottom-3 left-0 right-0 -z-10;
    }
  }

  tr[success] div[wrapper] {
    &:before {
      content: '';
      @apply bg-lime-500/5;
    }
  }

  tr[failure] div[wrapper] {
    &:before {
      content: '';
      @apply bg-red-500/5;
    }
  }
  
  [number] {
    @apply relative text-center text-3xl text-black/30 font-bold pr-5;
    div[wrapper] {
      @apply relative px-5 h-full;
      &:after {
        @apply absolute -right-2.5 top-2 bottom-2 w-px border-r border-black/15 border-dashed content-[''];
        content: '';
      }
    }
  }
  [component] {
    @apply whitespace-nowrap;
    div[wrapper] {
      @apply flex flex-col items-center justify-center whitespace-nowrap h-full w-full px-10 gap-y-2;
      &:after {
        @apply absolute -right-2.5 top-2 bottom-2 w-px border-r border-black/15 border-dashed content-[''];
      }
    }
    [label] {
      @apply font-bold;
    }
  }
  [centralized] {
    @apply px-5 font-bold uppercase text-gray-500;
    & > div {
      @apply text-center justify-center;
    }
    &[No] {
      @apply text-red-600; 
    }
    &[Yes] {
      @apply text-lime-600; 
    }
    div[wrapper] {
      &:after {
        @apply absolute -right-2.5 top-2 bottom-2 w-px border-r border-black/15 border-dashed content-[''];
      }
    }
  }
  [description] div[wrapper] {
    @apply px-6;
  }
}

</style>